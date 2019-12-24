import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import markdownIt from 'markdown-it';
import * as React from 'react';
import { ITopic } from 'Types';
import LemmaList from './LemmaList';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import Transcoder from '../../../services/Transcoder';

const md = markdownIt({ html: true, breaks: true });

// Matches a string of Arabic characters followed by an optional
// western full stop. There exists a Unicode Arabic full stop but
// the western full stop looks better visually, so that is what we
// have used in the markdown content.
// See: https://www.compart.com/en/unicode/U+06D4
const arabicRegexp = /[\u0600-\u06ff]+\.?/g;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
      },
      userSelect: 'none',
    },
    content: {
      '& *[lang="ar"]': {
        fontSize: 28,
        cursor: 'pointer',
        color: theme.palette.primary.dark,
      },
      '& strong, em': {
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
  const { showVocalization } = useSelector(
    (state: RootState) => state.settings,
  );
  const { title, subtitle, sections } = topic;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5">{title}</Typography>
      {subtitle && (
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
      {sections &&
        sections.map((section, index) => {
          const text =
            showVocalization || !arabicRegexp.test(section)
              ? section
              : Transcoder.stripTashkeel(section);
          const html = md
            .render(text)
            .replace(arabicRegexp, '<span lang="ar">$&</span>');
          return (
            <React.Fragment key={index}>
              <Typography
                variant="body2"
                dangerouslySetInnerHTML={{ __html: html }}
                className={`markdown-body ${classes.content}`}
              />
              <LemmaList topic={topic} sectionIndex={index} />
            </React.Fragment>
          );
        })}
    </Paper>
  );
};

export default ArticleContent;
