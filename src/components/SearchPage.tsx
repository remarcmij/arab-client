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

type Props = WithStyles<typeof styles>;

const SearchPage: React.FC<Props> = props => {
  const [term, setTerm] = useState('');

  const [goBack, handleBack] = useGoBack();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
    // tslint:disable-next-line
    console.log(term);
  };

  if (goBack) {
    return <Redirect to="/content" />;
  }

  return (
    <React.Fragment>
      <NavBar
        title={'Search'}
        onBack={handleBack}
        rightHandButtons={<input type="text" value={term} onChange={handleChange} />}
      />
      <GridContainer>
        <Paper className={props.classes.root}>
          <Typography variant="h4" component="h1" gutterBottom={true}>
            {term}
          </Typography>
          <Typography variant="body1">Bla bla</Typography>
          <Typography variant="caption">Copyright 2019, Jim Cramer, Amstelveen</Typography>
        </Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(SearchPage);
