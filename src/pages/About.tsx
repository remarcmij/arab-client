import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import withNavBar from '../components/withNavBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  }),
);

type Props = Readonly<{
  setNavBackRoute: (to: string) => void;
}>;

const About: React.FC<Props> = props => {
  const classes = useStyles();
  const { setNavBackRoute } = props;

  useEffect(() => {
    setNavBackRoute('/content');
  }, [setNavBackRoute]);

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom={true}>
        Overzicht
      </Typography>
      <Typography variant="body1">Bla bla</Typography>
      <Typography variant="caption">
        Copyright 2019, Jim Cramer, Amstelveen
      </Typography>
    </Paper>
  );
};

export default withNavBar(About);
