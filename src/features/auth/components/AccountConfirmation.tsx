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
import { redirectUser } from '../actions';

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
    isResent: false,
    message: '',
    toContent: false,
    isValid: true,
    loading: true,
    expired: false,
  });
  const dispatch = useDispatch();
  const { user, parentRedirection, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  const redirectToContent = () => setState({ ...state, toContent: true });
  const handleNotifications = (type: ToastType, message: string) => {
    const toast = setToast(type, message);
    dispatch(toast);
  };

  const requestToken = async () => {
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
    const body = JSON.stringify({ token });

    (async () => {
      try {
        const { data } = await axios.post(`/auth/confirmation`, body);

        setState(s => ({
          ...s,
          isValid: true,
          toContent: true,
          message: data.message,
        }));
      } catch (error) {
        setState(s => ({
          ...s,
          // this is refers to token_expired statusCode.
          expired: error.response.status === 401,
          message: error.response.data.message,
          isValid: false,
        }));
      } finally {
        setState(s => ({
          ...s,
          loading: false,
        }));
      }
    })();
  }, [token, setState]);

  /**
   * This Component redirects non-logged-in users to `/login`, and authorized users to `/content`
   */
  const RouteNonLoggedInUsers = () =>
    user ? <Redirect to="/content" /> : <Redirect to="/login" />;

  if (loading || state.loading) {
    return <Spinner />;
  }

  if (user?.verified || state.isValid || state.toContent) {
    if (user?.verified && !state.isValid) {
      // already verified users.
      handleNotifications('success', state.message);
    }

    if (state.isValid) {
      // valid token.
      handleNotifications('success', state.message);
    }

    return <RouteNonLoggedInUsers />;
  }

  /** handling error methodology */
  if (state.expired) {
    handleNotifications('warning', 'expired link! please login and try again.');
  }

  if ((!state.isValid || !user) && !state.isResent) {
    if (!state.expired && !state.isValid) {
      // not expired but not valid..
      handleNotifications('error', state.message);
      return <RouteNonLoggedInUsers />;
    }

    if (!user && state.expired) {
      // if not logged-in, we want him back.
      if (
        parentRedirection == null &&
        parentRedirection !== window.location.pathname
      ) {
        dispatch(redirectUser(window.location.pathname));
      }

      return <Redirect to="/login" />;
    }
  }

  return (
    <TrimmedContainer>
      <Grid container>
        <>
          <Typography variant="body2">
            You will receive an email, the process may take up to 2 minutes
            utmost,{' '}
            {!state.isResent
              ? 'please verify your e-mail address by requesting a new verification link.'
              : 'please re-check your e-mail inbox, social, promotion or spam if not found.'}
          </Typography>
          <Typography variant="caption">
            making sure you&#39;re up and running with the confirmation process,
            you can click this button after two minutes to get a new link
            request.
          </Typography>
          <Grid item className={btnSize}>
            <Button fullWidth onClick={requestToken} disabled={state.isResent}>
              request new verification link
              <ResendButtonIcon />
            </Button>
          </Grid>
        </>
        <Grid item className={btnSize}>
          <Button fullWidth onClick={redirectToContent}>
            go to unrestricted content
          </Button>
        </Grid>
      </Grid>
    </TrimmedContainer>
  );
};

export default AccountConfirmation;
