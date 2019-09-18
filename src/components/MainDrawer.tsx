import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { logout } from '../actions/auth';
import * as C from '../constants';
import { RootState } from '../reducers';
import SettingsDialog from './SettingsDialog';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    avatar: {
      margin: theme.spacing(2),
    },
    icon: {
      margin: theme.spacing(2),
    },
  });

interface OwnProps {
  open: boolean;
  toggleDrawer: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators({ logout }, dispatch);

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

type ReduxProps = ReturnType<typeof mapDispatchToProps> &
  ReturnType<typeof mapStateToProps>;

type Props = OwnProps & WithStyles<typeof styles> & ReduxProps;

const MainDrawer: React.FC<Props> = props => {
  const { classes, open, toggleDrawer } = props;
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const { user } = props;

  const AboutLink = (p: any, ref: any) => <Link to="/about" {...p} />;

  const sideList = (
    <div className={classes.list}>
      {user ? (
        <>
          {user.photo && (
            <Avatar
              alt="User avatar"
              src={user.photo}
              className={classes.avatar}
            />
          )}

          <List>
            <ListItem button={true} onClick={() => setSettingsDialogOpen(true)}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={C.EDIT_SETTINGS} />
            </ListItem>
          </List>
          <List>
            <ListItem button={true} onClick={props.logout}>
              <ListItemIcon>
                <Icon className={clsx(classes.icon, 'fa fa-sign-out-alt')} />
              </ListItemIcon>
              <ListItemText primary={C.LOGOUT} />
            </ListItem>
          </List>
          <Divider />
        </>
      ) : (
        <List>
          <ListItem button={true} onClick={() => setRedirectToLogin(true)}>
            <ListItemIcon>
              <Icon className={clsx(classes.icon, 'fa fa-sign-in-alt')} />
            </ListItemIcon>
            <ListItemText primary={C.LOGIN} />
          </ListItem>
        </List>
      )}
      <List>
        <ListItem component={React.forwardRef(AboutLink)}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={C.ABOUT_MENU_ITEM} />
        </ListItem>
      </List>
    </div>
  );

  if (redirectToLogin) {
    return <Redirect to="/login" />;
  }

  return (
    <React.Fragment>
      <Drawer open={open} onClose={toggleDrawer}>
        <div
          tabIndex={0}
          role="button"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          {sideList}
        </div>
      </Drawer>
      <SettingsDialog
        open={settingsDialogOpen}
        onClose={() => setSettingsDialogOpen(false)}
      />
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(MainDrawer));
