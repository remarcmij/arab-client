import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
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
import useParentRedirectRoute from '../hooks/useParentRedirectRoute';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btnSize: {
      padding: theme.spacing(2),
      width: '50%',
    },
  }),
);

const AccountConfirmation: React.FC = () => {
  const { token } = useParams();
  const { btnSize } = useStyles();
  const [state, setState] = useState({
    loading: false,
    expired: false,
    isValid: false,
    isResent: false,
    message: '',
    toContent: false,
    toLogin: false,
  });
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { redirectBack } = useParentRedirectRoute();

  const redirectToContent = () => setState({ ...state, toContent: true });
  const redirectToLogin = () => setState({ ...state, toLogin: true });
  const handleNotifications = (type: ToastType, message: string) => {
    const toast = setToast(type, message);
    dispatch(toast);
  };

  useEffect(() => {
    const body = JSON.stringify({ token });
    void axios
      .post(`/auth/confirmation`, body)
      .then(({ data }) => {
        setState(s => ({ ...s, isValid: true, message: data.message }));
      })
      .catch(({ response: { data, status } }) => {
        // this is refers to token_expired statusCode.
        if (status === 401) {
          setState(s => ({ ...s, expired: true }));
        }
        setState(s => ({ ...s, isValid: false, message: data.message }));
      })
      .finally(() => setState(s => ({ ...s, loading: false })));
  }, [token, setState]);

  const requestNewToken = async () => {
    try {
      setState(s => ({ ...s, isResent: true }));
      await axios.get('/auth/token/' + token);
    } catch (error) {
      // Message will comeback with the preferred language.
      setState(s => ({ ...s, isResent: false }));
      handleNotifications(
        'error',
        error.response.data.message || error.message,
      );
    }
  };

  useEffect(() => {
    if (state.isResent) {
      const interval = setTimeout(() => {
        setState(s => ({ ...s, isResent: false }));
      }, 1000 * 60 * 2);

      return () => clearTimeout(interval);
    }
  }, [setState, state.isResent]);

  if (user?.verified || state.toContent) {
    return <Redirect to="/content" />;
  }

  if (state.toLogin) {
    redirectBack();
    return <Redirect to="/login" />;
  }

  if (state.loading) {
    return <Spinner />;
  }

  if (state.isValid && user?.verified) {
    handleNotifications('success', state.message);
    redirectToContent();
  } else if (state.isResent) {
    handleNotifications(
      'info',
      'An E-mail been sent to your inbox please re-check your email address.',
    );
  } else if (user && state.expired && !state.isResent) {
    handleNotifications(
      'info',
      'expired request, please re-request new token.',
    );
  } else {
    handleNotifications('error', state.message || 'Oops! something went wrong');
  }

  return (
    <TrimmedContainer>
      <Grid container>
        {user && !user.verified ? (
          <>
            <Typography variant="body2">
              This process may take up to 2 minutes utmost,{' '}
              {!state.isResent
                ? 'please verify your e-mail address by requesting a new token.'
                : 'please re-check your e-mail inbox, social, promotion or spam if not found.'}
            </Typography>
            <Typography variant="caption">
              making sure you&#39;re up and running with the confirmation
              process, you can click this button after two minutes to get a new
              token request.
            </Typography>
            <Grid item className={btnSize}>
              <Button
                fullWidth
                onClick={requestNewToken}
                disabled={state.isResent}
              >
                Resend Token
                <ResendButtonIcon />
              </Button>
            </Grid>
          </>
        ) : (
          <>
            {/* 
              if the token is expired and the user isn't logged in case don't send 
              an e-mail but require him to login, this might be an accident, 
              either case I assume this as an extra security measure.
            */}
            <Typography variant="body2">
              This process can not be done while you&#39;re signed out please
              login and try again.
            </Typography>
            <Grid item className={btnSize}>
              <Button
                color="primary"
                variant="contained"
                onClick={redirectToLogin}
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </>
        )}
        <Grid item className={btnSize}>
          <Button fullWidth onClick={redirectToContent}>
            Go To Content
          </Button>
        </Grid>
      </Grid>
    </TrimmedContainer>
  );
};

export default AccountConfirmation;
