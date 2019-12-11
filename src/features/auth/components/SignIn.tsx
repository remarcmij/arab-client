import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { localLoginThunk } from '../actions';
import googleImage from '../assets/btn_google_signin_dark_normal_web.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    pane: {
      flex: 1,
      padding: theme.spacing(4),
    },
    socialMediaPane: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      width: '100%',
    },
    googleButton: {
      padding: 0,
    },
    signInButton: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.primary.dark,
      fontWeight: 'bold',
    },
  }),
);

const googleUrl =
  process.env.NODE_ENV === 'production'
    ? '/auth/google'
    : 'http://localhost:8080/auth/google';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const classes = useStyles();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(localLoginThunk({ email, password }));
  };

  if (isAuthenticated) {
    return <Redirect to="/content" />;
  }

  return (
    <Box mt={2} className={classes.container}>
      <Paper classes={{ root: `${classes.pane} ${classes.socialMediaPane}` }}>
        <Button href={googleUrl} classes={{ root: classes.googleButton }}>
          <img src={googleImage} alt="Google" />
        </Button>
      </Paper>
      <Box m={1} />
      <Paper classes={{ root: classes.pane }}>
        <Typography variant="h4" gutterBottom={true}>
          {t('login')}
        </Typography>
        <Typography variant="body2">{t('login_prompt')}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label={t('email_address')}
            name="email"
            className={classes.textField}
            type="email"
            autoFocus={true}
            margin="normal"
            required={true}
            value={email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label={t('password_label')}
            className={classes.textField}
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            required={true}
            value={password}
            onChange={handleChange}
          />
          <Box textAlign="right" my={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              classes={{ root: classes.signInButton }}
            >
              {t('login')}
            </Button>
          </Box>
        </form>
        <Typography variant="body1">
          {t('no_account_yet')}{' '}
          <Link to="/signup" className={classes.link}>
            {t('register')}
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default SignIn;
