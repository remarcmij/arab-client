import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setToast } from '../../../layout/actions';
import handleAxiosErrors from '../../../utils/handleAxiosErrors';

const PasswordReset: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = JSON.stringify({ email });

    try {
      await axios.post('/auth/password', body);
      dispatch(
        setToast(
          'info',
          'An email been sent to ' + email + ' Please check your inbox.',
        ),
      );
    } catch (err) {
      handleAxiosErrors(err, dispatch);
    }
  };

  return (
    <>
      <Typography variant="h4" gutterBottom={true}>
        {t('reset_password')}
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          type="email"
          label={t('email_address')}
          name="email"
          required={true}
          margin="normal"
          fullWidth={true}
          autoFocus={true}
          value={email}
          onChange={handleChange}
        />
        <Box textAlign="right" mt={4}>
          <Button type="submit" variant="contained" color="primary">
            {t('submit_button_label')}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PasswordReset;
