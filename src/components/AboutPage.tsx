import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import GridContainer from './GridContainer';
import NavBar from './NavBar';
import * as S from './strings';
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

type State = {
  goBack: boolean;
};

interface Props extends WithStyles<typeof styles> {}

const AboutPage: React.FC<Props> = props => {
  const [goBack, handleBack] = useGoBack();

  if (goBack) {
    return <Redirect to="/content" />;
  }

  return (
    <React.Fragment>
      <NavBar title={S.ABOUT_TITLE} onBack={handleBack} />
      <GridContainer>
        <Paper className={props.classes.root}>
          <Typography variant="h4" component="h1" gutterBottom={true}>
            Overzicht
          </Typography>
          <Typography variant="body1">Bla bla</Typography>
          <Typography variant="caption">Copyright 2019, Jim Cramer, Amstelveen</Typography>
        </Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(AboutPage);
