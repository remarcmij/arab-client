import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { clearToast } from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    success: {
      backgroundColor: green[600],
    },
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    info: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {
      backgroundColor: amber[700],
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const SnackbarContainer: React.FC = () => {
  const toast = useSelector((state: RootState) => state.layout.toast);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleClose = (event: unknown, reason: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearToast());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={toast.open}
      autoHideDuration={4000}
      onClose={handleClose}
    >
      <SnackbarContent
        className={clsx(classes[toast.type], classes.message)}
        message={<span>{toast.msg}</span>}
      />
    </Snackbar>
  );
};

export default SnackbarContainer;
