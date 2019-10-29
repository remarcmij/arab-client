import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Types from 'Types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      overflowX: 'auto',
      padding: theme.spacing(3),
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
);

type Props = Readonly<{
  document: Types.Topic;
  index: number;
  length: number;
}>;

const FlashcardHeader: React.FC<Props> = props => {
  const { document, index, length } = props;
  const classes = useStyles();
  return (
    <Paper className={classes.root} square={true}>
      <div className={classes.flexContainer}>
        <Typography variant="h5" gutterBottom={true}>
          {document.title}
        </Typography>
        <Typography variant="body1">
          {index + 1}/{length}
        </Typography>
      </div>
      <div>
        {document.subtitle && (
          <Typography variant="body1">{document.subtitle}</Typography>
        )}
      </div>
    </Paper>
  );
};

export default FlashcardHeader;
