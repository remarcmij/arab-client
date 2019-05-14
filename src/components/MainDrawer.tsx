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
import React, { useContext, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../contexts/UserProfileProvider';
import * as C from './constants';
import SettingsDialog from './SettingsDialog';

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    avatar: {
      margin: theme.spacing.unit * 2,
    },
  });

interface OwnProps {
  open: boolean;
  toggleDrawer: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const MainDrawer: React.FC<Props> = props => {
  const { classes, open, toggleDrawer } = props;
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { profile, clearProfile } = useContext(UserProfileContext);

  const AboutLink = (p: {}) => <Link to="/about" {...p} />;

  const logout = () => {
    clearProfile();
    setLoggingOut(true);
  };

  const sideList = (
    <div className={classes.list}>
      {profile && (
        <>
          {profile.photo && (
            <Avatar
              alt="User avatar"
              src={profile.photo}
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
            <ListItem button={true} onClick={logout}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      <List>
        <ListItem component={AboutLink}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={C.ABOUT_MENU_ITEM} />
        </ListItem>
      </List>
    </div>
  );

  if (loggingOut) {
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

export default withStyles(styles)(MainDrawer);
