import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setToast } from '../../../layout/actions';
import handleAxiosErrors from '../../../utils/handleAxiosErrors';
import { storeToken } from '../../../utils/token';

const PasswordChange: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    currentPassword: '',
  });
  const history = useHistory();

  const { password, password2, currentPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setToast('error', t('passwords_mismatch')));
    } else {
      const body = JSON.stringify({ password, currentPassword });

      try {
        const res = await axios.post('/auth/password', body);
        storeToken(res.data.token);
        dispatch(setToast('success', 'password changed.'));
        history.push('/content');
      } catch (err) {
        handleAxiosErrors(err, dispatch);
      }
    }
  };

  return (
    <Grid container={true} justify="center">
      <Grid item={true} xs={12} md={8} lg={6}>
        <Paper>
          <Box flexDirection="column" mt={2} p={4}>
            <Typography variant="h4" gutterBottom={true}>
              {t('change_password')}
            </Typography>
            <form onSubmit={handleSubmit} autoComplete="off">
              <TextField
                type="password"
                label={t('current_password_label')}
                name="currentPassword"
                required={true}
                margin="normal"
                fullWidth={true}
                autoFocus={true}
                value={currentPassword}
                onChange={handleChange}
              />
              <TextField
                type="password"
                label={t('new_password_label')}
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
              <Box textAlign="right" mt={4}>
                <Button type="submit" variant="contained" color="primary">
                  {t('submit_button_label')}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PasswordChange;
