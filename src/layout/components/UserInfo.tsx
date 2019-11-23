import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

const UserInfo: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user === null) {
    return null;
  }

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title={user.email}>
        <Box m={2}>
          {user.photo ? (
            <Avatar alt="User avatar" src={user.photo} />
          ) : (
            <Avatar>
              <PersonIcon />
            </Avatar>
          )}
        </Box>
      </Tooltip>
      <Typography variant="body1">{user.name}</Typography>
    </Box>
  );
};

export default UserInfo;
