import Button from '@material-ui/core/Button';
import ResendButtonIcon from '@material-ui/icons/Refresh';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { setToast, ToastType } from '../../../layout/actions';
import Spinner from '../../../layout/components/Spinner';
import TrimmedContainer from '../../../layout/components/TrimmedContainer';
import Counter from './Counter';

const AccountConfirmation: React.FC = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');
  const [done, setDone] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [timerRunning, setTimerRunning] = useState(false);

  const handleClick = () => setDone(true);
  const handleNotifications = (type: ToastType, message: string) => {
    const toast = setToast(type, message);
    dispatch(toast);
  };

  useEffect(() => {
    const body = JSON.stringify({ token });
    void axios
      .post(`/auth/confirmation`, body)
      .then(({ data }) => {
        setIsValid(true);
        setMessage(data.message);
      })
      .catch(({ response: { data, status } }) => {
        // this is refers to token_expired statusCode.
        if (status === 401) {
          setExpired(true);
        }
        setIsValid(false);
        setMessage(data.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const requestNewToken = async () => {
    try {
      await axios.get('/auth/token/' + token);
      setTimerRunning(true);
    } catch (error) {
      // Message will comeback with the preferred language.
      handleNotifications(
        'error',
        error.response.data.message || error.message,
      );
    }
  };

  if (done) {
    return <Redirect to="/content" />;
  }

  if (loading) {
    return <Spinner />;
  }

  if (expired) {
    handleNotifications(
      'info',
      'It seem like this is an old request, please check your e-mail inbox.',
    );
  }

  if (user?.verified) {
    handleNotifications('success', message);
  } else {
    handleNotifications('error', message);
  }

  const shouldUserGoToContent = !user || !expired;

  return (
    <TrimmedContainer>
      {shouldUserGoToContent ?? (isValid && user?.verified) ? (
        <Button onClick={handleClick}>Go To Content</Button>
      ) : (
        <Button disabled={timerRunning} onClick={requestNewToken}>
          <Counter
            onFinishCounting={() => setTimerRunning(false)}
            restartTimer={timerRunning}
            timer="00:02:00"
          >
            Resend Token
            <ResendButtonIcon />
          </Counter>
        </Button>
      )}
    </TrimmedContainer>
  );
};
export default AccountConfirmation;
