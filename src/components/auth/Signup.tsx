import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { setAlert } from '../../actions/alert';
import { signup } from '../../actions/auth';
import * as C from '../../constants';
import { RootState } from '../../reducers';

interface FormData {
  [key: string]: string;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ setAlert, signup }, dispatch);

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

  const { name, email, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert('Passwords do not match.', 'danger');
    } else {
      props.signup({ name, email, password });
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
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder={C.NAME}
              name="name"
              required={true}
              value={name}
              onChange={handleChange}
            />
          </div>
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
          <div className="form-group">
            <input
              type="password"
              placeholder={C.REPEAT_PASSWORD}
              name="password2"
              minLength={8}
              value={password2}
              onChange={handleChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value={C.SIGNUP} />
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
