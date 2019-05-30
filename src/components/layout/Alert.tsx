import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

const styles = () =>
  createStyles({
    root: {
      backgroundColor: 'red',
      marginTop: 2,
    },
  });

const mapStateToProps = (state: RootState) => ({ alerts: state.alert });

type Props = ReturnType<typeof mapStateToProps> & WithStyles<typeof styles>;

const Alert: React.FC<Props> = ({ alerts, classes }) => {
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

export default connect(mapStateToProps)(withStyles(styles)(Alert));
