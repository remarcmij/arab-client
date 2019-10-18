import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import withNavBar from '../components/withNavBar';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(1),
      overflowX: 'auto',
      padding: theme.spacing(4),
    },
  });

type Props = {
  setNavBackRoute: (to: string) => void;
} & WithStyles<typeof styles>;

const About: React.FC<Props> = props => {
  const { setNavBackRoute } = props;

  useEffect(() => {
    setNavBackRoute('/content');
  }, [setNavBackRoute]);

  return (
    <Paper className={props.classes.root}>
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

export default withNavBar(withStyles(styles)(About));
