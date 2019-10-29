import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    marginTop: 2,
  },
});

const mapStateToProps = (state: RootState) => ({ alerts: state.alert });

type Props = Readonly<ReturnType<typeof mapStateToProps>>;

const Alert: React.FC<Props> = ({ alerts }) => {
  const classes = useStyles();
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

export default connect(mapStateToProps)(Alert);
