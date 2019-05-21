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
import LemmaList from './LemmaList';
import markdownIt from 'markdown-it';

const md = markdownIt();
const arabicRegExp = /[\u0600-\u06ff]+/g;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit,
      },
      padding: theme.spacing.unit * 4,
      userSelect: 'none',
    },
    mdPadding: {
      // paddingRight: theme.spacing.unit * 3,
      // paddingLeft: theme.spacing.unit * 3,
    },
    content: {
      '& span[lang="ar"]': {
        fontSize: 28,
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
    },
  });

interface OwnProps {
  document: Types.AppDocument;
}

type Props = OwnProps & WithStyles<typeof styles>;

const LemmaArticle: React.FC<Props> = ({ document, classes }) => {
  const { title, subtitle, sections, lemmas } = document;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      {subtitle && (
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className={classes.mdPadding}
        />
      )}
      {sections.map((section, index) => {
        const html = md
          .render(section)
          .replace(arabicRegExp, '<span lang="ar">$&</span>');
        const sectionLemmas = lemmas.filter(
          lemma => lemma.sectionNum === index,
        );
        return (
          <React.Fragment key={index}>
            <section
              dangerouslySetInnerHTML={{ __html: html }}
              className={`markdown-body ${classes.mdPadding} ${
                classes.content
              }`}
            />
            <LemmaList lemmas={sectionLemmas} />
          </React.Fragment>
        );
      })}
    </Paper>
  );
};

export default withStyles(styles)(LemmaArticle);
