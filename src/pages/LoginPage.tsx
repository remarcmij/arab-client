import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { setAlert } from '../actions/alert';
import { localLogin } from '../actions/auth';
import * as C from '../constants';
import { RootState } from '../reducers';
import Button from '@material-ui/core/Button';

interface FormData {
  [key: string]: string;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ setAlert, localLogin }, dispatch);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

type ReduxProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  });

type Props = WithStyles<typeof styles> & ReduxProps;

const LoginPage: React.FC<Props> = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  } as FormData);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.localLogin({ email, password });
  };

  if (props.isAuthenticated) {
    return <Redirect to="/content" />;
  }

  return (
    <>
      <section className="container">
        <h1 className="large text-primary">{C.LOGIN}</h1>
        <p className="lead">
          <i className="fas fa-user" /> {C.LOGIN_PROMPT}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder={C.EMAIL_ADDRESS}
              name="email"
              required={true}
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder={C.PASSWORD}
              name="password"
              minLength={8}
              value={password}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value={C.LOGIN} />
        </form>
        <p className="my-1">
          {C.NO_ACCOUNT_YET} <Link to="/signup">{C.SIGNUP}</Link>
        </p>
      </section>
      <Button href="http://localhost:8080/auth/google">
        Login with Google
      </Button>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(LoginPage));
