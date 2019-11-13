import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: -60,
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  }),
);

const Welcome: React.FC = () => {
  const classes = useStyles();
  const [done, setDone] = useState(false);

  const handleClick = () => setDone(true);

  if (done) {
    return <Redirect to="/content" />;
  }

  return (
    <Paper className={classes.root}>
      <article>Welcome</article>
      <Button onClick={handleClick}>Go to content</Button>
    </Paper>
  );
};

export default Welcome;
