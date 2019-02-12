import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Transcoder from '../services/Transcoder';

interface Props {
  lemma: Lemma;
  classes: {
    root: string;
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
};

const Flashcard: React.FunctionComponent<Props> = props => {
  const { lemma, classes } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3">
        {lemma.nl}
      </Typography>
      <div lang="ar" dir="rtl">
        {Transcoder.stripTashkeel(lemma.ar)}
      </div>
      <div>{Transcoder.applyRomanization(lemma.trans, 'deMoor')}</div>
    </Paper>
  );
};

export default withStyles(styles)(Flashcard);
