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
import Divider from '@material-ui/core/Divider';
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

type Props = Readonly<{
  filter: (a: User) => boolean;
  subheader: string;
}>;

const UsersListItem: React.FC<Props> = props => {
  const { users } = useSelector((state: RootState) => state.admin);
  const dispatch = useDispatch();
  const authorizeUser = (user: User) => {
    dispatch(
      authorizeUserAsync({
        email: user.email,
        authorize: !user.authorized,
      }),
    );
  };

  const deleteUser = (email: string) => {
    dispatch(deleteUserAsync({ email }));
  };

  const mappedUsers = users.filter(props.filter).map(user => (
    <ListItem key={user._id}>
      <ListItemText secondary={user.email}>
        <>
          {user.name}{' '}
          <Typography variant="caption" color="textSecondary">
            ({i18next.t('last_access')}:{' '}
            {new Date(user.lastAccess).toLocaleString()})
          </Typography>
        </>
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={() => authorizeUser(user)}>
          {user.authorized ? (
            <VerifiedUserIcon color="primary" />
          ) : (
            <VerifiedUserTwoToneIcon color="error" />
          )}
        </IconButton>
        <IconButton onClick={() => deleteUser(user.email)}>
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
            {i18next.t('no_match_for')} {i18next.t(props.subheader)}.
          </Typography>
        </ListItem>
      )}
    </List>
  );
};

const ManageUsersAdmin: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <Grid container={true} justify="center" style={{ position: 'relative' }}>
      <Grid item={true} xs={12} md={8}>
        <Box mt={4}>
          <Paper>
            <DialogTitle>{i18next.t('manage_users')}</DialogTitle>
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
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManageUsersAdmin;
