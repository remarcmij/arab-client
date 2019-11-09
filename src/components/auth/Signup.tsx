import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import { setToast } from '../../actions/toast';
import { RootState } from '../../reducers';

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

const Signup: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setToast('error', i18next.t('passwords_mismatch')));
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/welcome" />;
  }

  return (
    <>
      <section className="container">
        <h1 className="blue-text">{t('sign_up')}</h1>
        <p className="lead">
          <i className="fas fa-user" /> {t('create_account')}
        </p>
        <form
          className={classes.container}
          onSubmit={handleSubmit}
          noValidate={true}
          autoComplete="off"
        >
          <div>
            <TextField
              label={t('name_label')}
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
              label={t('email_label')}
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
              label={t('password_label')}
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
              label={t('repeat_password_label')}
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
          {t('have_account_already')} <Link to="/login">{t('login')}</Link>
        </p>
      </section>
    </>
  );
};

export default Signup;
