import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Types from 'Types';

const styles = (theme: Theme) =>
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
  });

type Props = {
  document: Types.Topic;
  index: number;
  length: number;
} & WithStyles<typeof styles>;

const FlashcardHeader: React.FC<Props> = props => {
  const { document, index, length, classes } = props;
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

export default withStyles(styles)(FlashcardHeader);
