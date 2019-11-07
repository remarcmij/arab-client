import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { AlertType } from '../../actions/alert';
import { RootState } from '../../reducers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    success: {
      backgroundColor: 'green',
    },
    warn: {
      backgroundColor: 'orange',
    },
    danger: {
      backgroundColor: 'red',
    },
  }),
);

const Alert: React.FC = () => {
  const classes = useStyles();
  const alerts = useSelector((state: RootState) => state.alert);
  if (alerts.length === 0) {
    return null;
  }

  return (
    <List classes={{ root: classes.root }}>
      {alerts.map(alert => {
        let boxProps: { bgcolor: string; color: string };
        switch (alert.alertType) {
          case AlertType.Success:
            boxProps = {
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            };
            break;
          case AlertType.Warn:
            boxProps = {
              bgcolor: 'secondary.main',
              color: 'secondary.contrastText',
            };
            break;
          default:
            boxProps = {
              bgcolor: 'error.main',
              color: 'error.contrastText',
            };
            break;
        }
        return (
          <ListItem key={alert.id}>
            <Typography variant="body1">
              <Box {...boxProps} p={2} m={1} style={{ width: '100%' }}>
                {alert.msg}
              </Box>
            </Typography>
          </ListItem>
        );
      })}
    </List>
  );
};

export default Alert;
