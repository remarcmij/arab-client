import {
  Box,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import VerifiedUserTwoToneIcon from '@material-ui/icons/VerifiedUserTwoTone';
import i18next from 'i18next';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { setToast } from '../../../layout/actions';
import { User } from '../../auth/actions';
import {
  authorizeUserAsync,
  deleteUserAsync,
  fetchUsersAsync,
} from '../actions';
import Divider from '@material-ui/core/Divider';

type Props = {
  filter: (a: User) => boolean;
  subheader: string;
};

const TEN_DAYS = 1000 * 60 * 60 * 24 * 10;

const UsersListItem: React.FC<Props> = props => {
  const { users } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();

  const verifyUserOnClick = (user: User) => {
    dispatch(
      authorizeUserAsync({
        email: user.email,
        authorize: !user.authorized,
      }),
    );
  };

  const removeUser = (email: string) => {
    dispatch(deleteUserAsync({ email }));
  };

  const mappedUsers = users.filter(props.filter).map(user => (
    <ListItem key={user._id}>
      <ListItemText secondary={user.email}>
        <>
          {user.name}{' '}
          <Typography variant="caption" color="textSecondary">
            (Last Access: {new Date(user.lastAccess).toLocaleString()})
          </Typography>
        </>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => verifyUserOnClick(user)}>
          {user.authorized ? (
            <VerifiedUserIcon color="primary" />
          ) : (
            <VerifiedUserTwoToneIcon color="error" />
          )}
        </IconButton>
        <IconButton onClick={() => removeUser(user.email)}>
          <DeleteIcon color="error" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ));

  return (
    <List
      subheader={<ListSubheader>{i18next.t(props.subheader)}</ListSubheader>}
    >
      {mappedUsers.length ? (
        mappedUsers
      ) : (
        <ListItem>
          <Typography variant="caption" color="error">
            No {i18next.t(props.subheader)} was found.
          </Typography>
        </ListItem>
      )}
    </List>
  );
};

const UsersOptionsAdmin: React.FC = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (notification?.message) {
      dispatch(setToast('success', notification.message));
    }
  }, [notification]);

  return (
    <Grid container={true} justify="center" style={{ position: 'relative' }}>
      <Grid item={true} xs={12} md={8}>
        <Box mt={4}>
          <Paper>
            <DialogTitle>User Options</DialogTitle>
            <UsersListItem
              subheader="authorized_users"
              filter={user => user.authorized && !user.admin}
            />
            <Divider />
            <UsersListItem
              subheader="non_authorized_users"
              filter={user => !user.authorized && user.verified && !user.admin}
            />
            <Divider />
            <UsersListItem
              subheader="non_verified_users"
              filter={user => !user.verified}
            />
            <Divider />
            <UsersListItem
              subheader="long_time_no_access_users"
              filter={user =>
                Date.parse(user.lastAccess) < Date.now() - TEN_DAYS
              }
            />
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UsersOptionsAdmin;
