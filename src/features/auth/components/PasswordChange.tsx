import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { setToast } from '../../../layout/actions';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import handleAxiosErrors from '../../../utils/handleAxiosErrors';
import { storeToken } from '../../../utils/token';
import { loadUserAsync, secureUser } from '../../auth/actions';
import { RootState } from 'typesafe-actions';

const PasswordChange: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
    currentPassword: '',
  });
  const { resetToken } = useParams();
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);

  const { password, password2, currentPassword } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const passwordRequestType = async (
    type: 'reset' | 'set' | 'change',
    arg?: object,
  ) => {
    const uri = `/auth/password/${type}`;
    const data = { password, ...arg };
    return await axios.patch(uri, JSON.stringify(data));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setToast('error', t('passwords_mismatch')));
    } else {
      try {
        const res = resetToken
          ? await passwordRequestType('reset', { resetToken })
          : user?.isSecured
          ? await passwordRequestType('change', { currentPassword })
          : await passwordRequestType('set');

        storeToken(res.data.token);
        dispatch(setToast('success', 'Password changed.'));

        if (resetToken) {
          dispatch(loadUserAsync());
        }

        if (!user?.isSecured) {
          dispatch(secureUser(user!));
        }

        history.replace('/content');
      } catch (err) {
        handleAxiosErrors(err, dispatch);
      }
    }
  };

  const shouldConfirmPassword = user?.isSecured && !resetToken;

  return (
    <TrimmedContainer>
      <Typography variant="h4" gutterBottom={true}>
        {t('change_password')}
      </Typography>
      <form onSubmit={handleSubmit} autoComplete="off">
        {shouldConfirmPassword && (
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
        )}
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
    </TrimmedContainer>
  );
};

export default PasswordChange;
