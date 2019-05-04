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
import LemmaTable from './LemmaTable';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit,
      },
      userSelect: 'none',
    },
    mdPadding: {
      paddingTop: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
  });

interface OwnProps {
  document: Types.LemmaDocument;
}

type Props = OwnProps & WithStyles<typeof styles>;

const LemmaArticle: React.FC<Props> = ({ document, classes }) => {
  const { title, subtitle, prolog, epilog, body: lemmas } = document;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.mdPadding}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className={classes.mdPadding}
        />
      )}
      {prolog && (
        <section
          dangerouslySetInnerHTML={{ __html: prolog }}
          className={`markdown-body ${classes.mdPadding}`}
        />
      )}
      <LemmaTable lemmas={lemmas} />
      {epilog && (
        <section
          dangerouslySetInnerHTML={{ __html: epilog }}
          className={`markdown-body ${classes.mdPadding}`}
        />
      )}
    </Paper>
  );
};

export default withStyles(styles)(LemmaArticle);
