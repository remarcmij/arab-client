import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    zIndex: 999,
    height: '2em',
    width: '2em',
    overflow: 'visible',
    margin: 'auto',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const Spinner: React.FC<{}> = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.root} />;
};

export default Spinner;
