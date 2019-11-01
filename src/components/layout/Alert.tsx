import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    marginTop: 2,
  },
});

const Alert: React.FC<{}> = () => {
  const classes = useStyles();
  const alerts = useSelector((state: RootState) => state.alert);
  if (alerts.length === 0) {
    return null;
  }

  return (
    <List classes={{ root: classes.root }}>
      {alerts.map(alert => (
        <ListItem key={alert.id}>
          <Typography variant="body1">{alert.msg}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

export default Alert;
