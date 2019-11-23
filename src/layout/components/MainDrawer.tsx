import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import { logout } from '../../features/auth/actions';
import UserInfo from './UserInfo';

const useStyles = makeStyles((theme: Theme) =>
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
        <List>
          {user ? (
            <React.Fragment>
              <ListItem button={true} onClick={() => dispatch(logout())}>
                <ListItemIcon>
                  <Icon className={'fa fa-fw fa-sign-out-alt'} />
                </ListItemIcon>
                <ListItemText primary={t('logout')} />
              </ListItem>
              <Divider />
              {user.admin && (
                <React.Fragment>
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
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <ListItem button={true} onClick={() => setToLogin(true)}>
                <ListItemIcon>
                  <Icon className={'fa fa-fw fa-sign-in-alt'} />
                </ListItemIcon>
                <ListItemText primary={t('login')} />
              </ListItem>
            </React.Fragment>
          )}
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
