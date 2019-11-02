import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import Settings from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { logout } from '../actions/auth';
import { RootState } from '../reducers';
import SettingsDialog from './SettingsDialog';

const useStyles = makeStyles((theme: Theme) =>
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
  }),
);

type Props = Readonly<{
  open: boolean;
  toggleDrawer: () => void;
}>;

const MainDrawer: React.FC<Props> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { t } = useTranslation();
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { open, toggleDrawer } = props;

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
              <ListItemText primary={t('change_settings')} />
            </ListItem>
          </List>
          <List>
            <ListItem button={true} onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <Icon className={clsx(classes.icon, 'fa fa-sign-out-alt')} />
              </ListItemIcon>
              <ListItemText primary={t('logout')} />
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
            <ListItemText primary={t('login')} />
          </ListItem>
        </List>
      )}
      <List>
        <ListItem component={React.forwardRef(AboutLink)}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary={t('about')} />
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

export default MainDrawer;
