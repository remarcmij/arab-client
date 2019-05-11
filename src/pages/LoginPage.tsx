import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import GridContainer from '../components/GridContainer';
import Grid from '@material-ui/core/Grid';
import NavBar from '../components/NavBar';
import * as S from '../components/strings';

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
      <NavBar title={S.APP_TITLE} hideSearchButton={true} />
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
                {S.SIGN_IN_WITH_GOOGLE}
              </Button>
            </Grid>
            <Grid item={true}>
              <Button color="secondary" variant="contained" fullWidth={true}>
                {S.SIGN_IN_WITH_USERNAME}
              </Button>
            </Grid>
            <Grid item={true}>
              <Button color="secondary" variant="contained" fullWidth={true}>
                {S.SIGN_UP}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </GridContainer>
    </React.Fragment>
  );
};

export default withStyles(styles)(LoginPage);
