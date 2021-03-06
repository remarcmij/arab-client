import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import i18next from 'i18next';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { setToast } from '../../../layout/actions';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import { registerUserAsync } from '../actions';

const useStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
  },
}));

const Register: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setToast('error', i18next.t('passwords_mismatch')));
    } else {
      dispatch(registerUserAsync({ name, email, password }));
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/welcome" />;
  }

  return (
    <TrimmedContainer>
      <Typography variant="h4" gutterBottom={true}>
        {t('register')}
      </Typography>
      <Typography variant="subtitle2">{t('create_account')}</Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          label={t('name_label')}
          name="name"
          required={true}
          margin="normal"
          fullWidth={true}
          autoFocus={true}
          value={name}
          onChange={handleChange}
        />
        <TextField
          type="email"
          label={t('email_label')}
          name="email"
          required={true}
          margin="normal"
          fullWidth={true}
          value={email}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label={t('password_label')}
          name="password"
          inputProps={{ minLength: 8 }}
          required={true}
          margin="normal"
          fullWidth={true}
          value={password}
          onChange={handleChange}
        />
        <TextField
          type="password"
          label={t('repeat_password_label')}
          name="password2"
          required={true}
          margin="normal"
          fullWidth={true}
          value={password2}
          onChange={handleChange}
        />
        <Box textAlign="right" mt={4} mb={4}>
          <Button type="submit" variant="contained" color="primary">
            {t('register_button_label')}
          </Button>
        </Box>
      </form>
      <Typography variant="body1">
        {t('have_account_already')}{' '}
        <Link to="/login" className={classes.link}>
          {t('sign_in')}
        </Link>
      </Typography>
    </TrimmedContainer>
  );
};

export default Register;
