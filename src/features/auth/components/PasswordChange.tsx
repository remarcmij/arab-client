import Button from '@material-ui/core/Button';
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
    <>
      <h1 className="blue-text">{t('password_reset')}</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <TextField
            type="password"
            label={t('password_label')}
            name="currentPassword"
            required={true}
            margin="normal"
            value={currentPassword}
            onChange={handleChange}
          />
        </div>
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
    </>
  );
};

export default PasswordChange;
