import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import markdownIt from 'markdown-it';
import * as React from 'react';
import Types from 'Types';

const md = markdownIt();
const arabicRegExp = /[\u0600-\u06ff]+/g;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit,
      },
    },
    content: {
      padding: theme.spacing.unit,
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing.unit * 3,
      },
      '& span[lang="ar"]': {
        fontSize: 28,
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  });

interface OwnProps {
  document: Types.MarkdownDocument;
}

type Props = OwnProps & WithStyles<typeof styles>;

const ArticleTextContent: React.FC<Props> = ({ document, classes }) => {
  const { body } = document;
  const html = md
    .render(body)
    .replace(arabicRegExp, '<span lang="ar">$&</span>');
  return (
    <Paper className={classes.root}>
      <article
        className={`markdown-body ${classes.content}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />{' '}
    </Paper>
  );
};

export default withStyles(styles)(ArticleTextContent);
