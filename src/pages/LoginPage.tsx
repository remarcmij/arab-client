import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Redirect } from 'react-router';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';
import * as S from '../components/strings';
import useGoBack from '../hooks/useGoBack';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit,
      overflowX: 'auto',
      padding: theme.spacing.unit * 4,
    },
  });

type Props = WithStyles<typeof styles>;

const LoginPage: React.FC<Props> = props => {
  return (
    <React.Fragment>
      <NavBar title={S.ABOUT_TITLE} />
      <GridContainer>
        <Paper className={props.classes.root}>
          <Typography variant="h4" component="h1" gutterBottom={true}>
            Login
          </Typography>
          <a href="http://localhost:8080/auth/google">Login with Google</a>
        </Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(LoginPage);
