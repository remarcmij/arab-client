import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import withMobileDialog, {
  InjectedProps,
} from '@material-ui/core/withMobileDialog';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import axios from 'axios';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
    divider: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
    },
    button: {
      margin: theme.spacing.unit,
    },
  });

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = OwnProps & InjectedProps & WithStyles<typeof styles>;

const LoginDialog: React.FC<Props> = props => {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    if (!authUrl) {
      return;
    }
    axios
      .get(authUrl)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  }, [authUrl]);

  const { fullScreen, classes, onClose, open } = props;

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="responsive-dialog-title">{'Login'}</DialogTitle>
      <DialogContent>
        <a href="http://localhost:8080/auth/google">Login with Google</a>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => setAuthUrl('/auth/google')}
        >
          Login with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default withMobileDialog<OwnProps>()(withStyles(styles)(LoginDialog));
