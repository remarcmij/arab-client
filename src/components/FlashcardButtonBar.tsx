import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import * as React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing.unit,
      flexGrow: 1,
      maxWidth: 200,
    },
  });

interface OwnProps {
  onNext: () => void;
  onPrev: () => void;
}

type Props = OwnProps & WithStyles<typeof styles>;

const FlashcardButtonBar: React.FC<Props> = ({ classes, onNext, onPrev }) => (
  <Paper className={classes.root} square={true} elevation={1}>
    <Button variant="outlined" className={classes.button} onClick={onPrev}>
      <ArrowBackIos />
    </Button>
    <Button
      variant="outlined"
      className={classes.button}
      onClick={onNext}
      autoFocus={true}
    >
      <ArrowForwardIos />
    </Button>
  </Paper>
);

export default withStyles(styles)(FlashcardButtonBar);
