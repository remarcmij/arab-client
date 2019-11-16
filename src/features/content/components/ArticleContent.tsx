import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import markdownIt from 'markdown-it';
import * as React from 'react';
import { ITopic } from 'Types';
import LemmaList from './LemmaList';

const md = markdownIt({ html: true });
const arabicRegExp = /[\u0600-\u06ff]+/g;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(1),
      },
      padding: theme.spacing(4),
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
  }),
);

type Props = {
  topic: ITopic;
};

const ArticleContent: React.FC<Props> = ({ topic }) => {
  const classes = useStyles();
  const { title, subtitle, sections, lemmas } = topic;

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
      {sections &&
        sections.map((section, index) => {
          const html = md
            .render(section)
            .replace(arabicRegExp, '<span lang="ar">$&</span>');
          const sectionLemmas =
            lemmas && lemmas.filter(lemma => lemma.sectionIndex === index);
          return (
            <React.Fragment key={index}>
              <section
                dangerouslySetInnerHTML={{ __html: html }}
                className={`markdown-body ${classes.mdPadding} ${classes.content}`}
              />
              {sectionLemmas && <LemmaList lemmas={sectionLemmas} />}
            </React.Fragment>
          );
        })}
    </Paper>
  );
};

export default ArticleContent;
