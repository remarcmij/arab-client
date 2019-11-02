import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { localLogin } from '../actions/auth';
import { RootState } from '../reducers';

interface FormData {
  [key: string]: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4),
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }),
);

const LoginPage: React.FC<{}> = props => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  } as FormData);

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(localLogin({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to="/content" />;
  }

  return (
    <Paper classes={{ root: classes.root }}>
      <Typography variant="h4">{t('login')}</Typography>
      <Typography variant="subtitle1">
        <i className="fas fa-user" /> {t('login_prompt')}
      </Typography>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <TextField
            label={t('email_address')}
            name="email"
            className={classes.textField}
            type="email"
            autoComplete="current-email"
            margin="normal"
            required={true}
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <TextField
            label={t('password_label')}
            className={classes.textField}
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            required={true}
            inputProps={{ minLength: 8 }}
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {t('login')}
        </button>
      </form>
      <p className="my-1">
        {t('no_account_yet')} <Link to="/signup">{t('sign_up')}</Link>
      </p>
      <Button href="http://localhost:8080/auth/google">
        Login with Google
      </Button>
    </Paper>
  );
};

export default LoginPage;
