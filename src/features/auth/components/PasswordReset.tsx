import React, { useState } from 'react';
import AccountConfirmation from './AccountConfirmation';

import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { setToast } from '../../../layout/actions';
import { resetPasswordRequest } from '../actions';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typesafe-actions';

const PasswordReset: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(setToast('error', t('passwords_mismatch')));
    } else {
      dispatch(resetPasswordRequest({ password }));
    }
  };

  return (
    <AccountConfirmation verified={(user && user.verified) || false}>
      <h1 className="blue-text">{t('password_reset')}</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
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
            {t('submit_request_button')}
          </Button>
        </div>
      </form>
    </AccountConfirmation>
  );
};

export default PasswordReset;
