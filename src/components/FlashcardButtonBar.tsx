import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
      flexGrow: 1,
      maxWidth: 200,
    },
  }),
);

type Props = Readonly<{
  onNext: () => void;
  onPrev: () => void;
}>;

const FlashcardButtonBar: React.FC<Props> = ({ onNext, onPrev }) => {
  const classes = useStyles();
  return (
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
};

export default FlashcardButtonBar;
