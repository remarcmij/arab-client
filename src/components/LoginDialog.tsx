import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import withMobileDialog, {
  WithMobileDialog,
} from '@material-ui/core/withMobileDialog';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    button: {
      margin: theme.spacing(1),
    },
  });

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = OwnProps & WithMobileDialog & WithStyles<typeof styles>;

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
