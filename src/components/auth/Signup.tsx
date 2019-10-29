import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { AlertType, setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import * as C from '../../constants';
import { RootState } from '../../reducers';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';

interface FormData {
  [key: string]: string;
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ setAlert, register }, dispatch);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

type ReduxProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

interface OwnProps {
  // setAlert: () => any;
}

type Props = OwnProps & ReduxProps;

const Signup: React.FC<Props> = props => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  } as FormData);
  const classes = useStyles();
  const { t } = useTranslation();

  const { name, email, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert('Passwords do not match.', AlertType.Danger);
    } else {
      props.register({ name, email, password });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/welcome" />;
  }

  return (
    <>
      <section className="container">
        <h1 className="blue-text">{C.SIGNUP}</h1>
        <p className="lead">
          <i className="fas fa-user" /> {C.CREATE_ACCOUNT}
        </p>
        <form
          className={classes.container}
          onSubmit={handleSubmit}
          noValidate={true}
          autoComplete="off"
        >
          <div>
            <TextField
              label={t('label.name')}
              className={classes.textField}
              name="name"
              required={true}
              margin="normal"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              className={classes.textField}
              type="email"
              label={t('label.email')}
              name="email"
              required={true}
              margin="normal"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              className={classes.textField}
              type="password"
              label={t('label.password')}
              name="password"
              inputProps={{ minLength: 8 }}
              required={true}
              margin="normal"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              className={classes.textField}
              type="password"
              label={t('label.repeat_password')}
              name="password2"
              inputProps={{ minLength: 8 }}
              required={true}
              margin="normal"
              value={password2}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button type="submit" variant="contained">
              {t('register_button')}
            </Button>
          </div>
        </form>
        <p className="my-1">
          {C.ALREADY_HAVE_ACCOUNT} <Link to="/login">{C.LOGIN}</Link>
        </p>
      </section>
    </>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
