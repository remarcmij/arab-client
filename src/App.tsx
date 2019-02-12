import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import FlashcardController from './components/FlashcardController';

interface Props {
  classes: {
    root: string;
  };
}

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component<Props> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Arabic
            </Typography>
          </Toolbar>
        </AppBar>
        <FlashcardController />
      </div>
    );
  }
}

export default withStyles(styles)(App);
