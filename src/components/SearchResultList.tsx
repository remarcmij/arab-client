import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import Types from 'Types';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      display: 'grid',
      gridTemplateColumns: '1fr 1fr max-content',
      gridTemplateRows: '2fr 1fr',
    },
    nl: {
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
    },
    ar: {
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
      fontSize: 28,
      color: theme.palette.primary.dark,
      cursor: 'pointer',
      // textAlign: 'center',
    },
    title: {
      gridColumn: '1 / 3',
      gridRow: '2 / 3',
    },
    button: {
      gridColumn: '3/4',
      gridRow: '1/3',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });

type Props = {
  lemmas: Types.Lemma[];
  onButtonClick: (lemma: Types.Lemma) => void;
} & WithStyles<typeof styles>;

const SearchResultList: React.FC<Props> = props => {
  const { classes } = props;

  const lemmaMap = props.lemmas.reduce((map, lemma) => {
    if (!map.has(lemma.topic)) {
      map.set(lemma.topic, lemma);
    }
    return map;
  }, new Map<string, Types.Lemma>());

  return (
    <>
      {Array.from(lemmaMap.values()).map(lemma => (
        <Paper classes={{ root: classes.root }} key={lemma._id}>
          <Typography variant="subtitle1" classes={{ root: classes.nl }}>
            {lemma.native}
          </Typography>
          <Typography
            variant="subtitle1"
            classes={{ root: classes.ar }}
            title={lemma.roman || ''}
          >
            <span dir="rtl" lang="ar">
              {lemma.foreign}
            </span>
          </Typography>
          <Typography variant="caption">{lemma.title}</Typography>
          <div className={classes.button}>
            <IconButton
              onClick={() => props.onButtonClick(lemma)}
              color="default"
            >
              <ArrowForwardIcon />
            </IconButton>
          </div>
        </Paper>
      ))}
    </>
  );
};

export default withStyles(styles)(SearchResultList);
