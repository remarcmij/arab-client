import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface Props {
  onNext: () => void;
  onPrev: () => void;
  classes: {
    root: string;
    button: string;
  };
}

interface State {}

const styles = (theme: Theme) => ({
  root: {},
  button: {
    margin: theme.spacing.unit,
  },
});

class FlashcardButtonBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  public render() {
    const { classes, onNext, onPrev } = this.props;
    return (
      <Paper className={classes.root}>
        <Button variant="contained" className={classes.button} onClick={onPrev}>
          Prev
        </Button>
        <Button variant="contained" className={classes.button} onClick={onNext}>
          Next
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(FlashcardButtonBar);
