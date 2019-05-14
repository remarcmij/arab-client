import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import * as C from '../components/constants';
import GridContainer from '../components/GridContainer';
import NavBar from '../components/NavBar';

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
      <NavBar title={C.APP_TITLE} hideSearchButton={true} />
      <GridContainer>
        <Paper className={props.classes.root}>
          <Typography variant="h4" component="h1" gutterBottom={true}>
            Login
          </Typography>
          <Grid
            container={true}
            spacing={16}
            direction="column"
            alignItems="center"
          >
            <Grid item={true}>
              <Button
                href="http://localhost:8080/auth/google"
                color="secondary"
                variant="contained"
                fullWidth={true}
              >
                {C.SIGN_IN_WITH_GOOGLE}
              </Button>
            </Grid>
            <Grid item={true}>
              <Button color="secondary" variant="contained" fullWidth={true}>
                {C.SIGN_IN_WITH_USERNAME}
              </Button>
            </Grid>
            <Grid item={true}>
              <Button color="secondary" variant="contained" fullWidth={true}>
                {C.SIGN_UP}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(LoginPage);
