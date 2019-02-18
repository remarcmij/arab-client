import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Transcoder from '../services/Transcoder';

interface IProps {
  lemma: ILemma;
  classes: {
    root: string;
    arabic: string;
  };
}

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  arabic: {
    fontFamily: 'Arial',
  },
};

const Flashcard: React.FunctionComponent<IProps> = props => {
  const { lemma, classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h3" component="h3" lang="foreign" dir="rtl">
        {Transcoder.stripTashkeel(lemma.foreign)}
      </Typography>
      <Typography variant="h5" component="h3">
        {lemma.base}
      </Typography>
      <Typography variant="h5" component="h3">
        <div>{Transcoder.applyRomanization(lemma.trans, 'deMoor')}</div>
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(Flashcard);
