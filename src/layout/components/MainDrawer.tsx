import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { logoutAsync } from '../../features/auth/actions';
import UserInfo from './UserInfo';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: 250,
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
  const { user } = useSelector((state: RootState) => state.auth);

  const { t } = useTranslation();
  const [toLogin, setToLogin] = useState(false);
  const { open, toggleDrawer } = props;

  const menuList = useMemo(
    () => (
      <div className={classes.list}>
        {user && <UserInfo />}
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              {t('user_side_menu_header')}
            </ListSubheader>
          }
        >
          {user ? (
            <React.Fragment>
              <ListItem button={true} onClick={() => dispatch(logoutAsync())}>
                <ListItemIcon>
                  <Icon className={'fa fa-fw fa-sign-out-alt'} />
                </ListItemIcon>
                <ListItemText primary={t('sign_in')} />
              </ListItem>
              {user.verified && (
                <ListItem button={true} component={Link} to="/password">
                  <ListItemIcon>
                    <Icon className={'fas fa-fw fa-key'} />
                  </ListItemIcon>
                  <ListItemText primary={t('change_password')} />
                </ListItem>
              )}
            </React.Fragment>
          ) : (
            <ListItem button={true} onClick={() => setToLogin(true)}>
              <ListItemIcon>
                <Icon className={'fa fa-fw fa-sign-in-alt'} />
              </ListItemIcon>
              <ListItemText primary={t('sign_in_or_register')} />
            </ListItem>
          )}
        </List>

        {user?.admin && (
          <List
            component="nav"
            subheader={
              <ListSubheader component="div">
                {t('admin_side_menu_header')}
              </ListSubheader>
            }
          >
            <ListItem button={true} component={Link} to="/admin/content">
              <ListItemIcon>
                <Icon className={'fas fa-fw fa-tasks'} />
              </ListItemIcon>
              <ListItemText primary={t('manage_content')} />
            </ListItem>
            <ListItem button={true} component={Link} to="/admin/upload">
              <ListItemIcon>
                <Icon className={'fas fa-fw fa-file-upload'} />
              </ListItemIcon>
              <ListItemText primary={t('upload_content')} />
            </ListItem>
          </List>
        )}
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">
              {t('info_side_menu_header')}
            </ListSubheader>
          }
        >
          <ListItem button={true} component={Link} to="/about">
            <ListItemIcon>
              <Icon className={'fas fa-fw fa-info'} />
            </ListItemIcon>
            <ListItemText primary={t('about')} />
          </ListItem>
        </List>
      </div>
    ),
    [user, classes, dispatch, t],
  );

  if (toLogin) {
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
          {menuList}
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default MainDrawer;
