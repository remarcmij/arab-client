import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { match, Redirect, RouteComponentProps, withRouter } from 'react-router';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { Lemma } from 'Types';
import * as C from '../../constants';
import Transcoder from '../../services/Transcoder';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';

const mapStateToProps = (state: RootState) => ({
  showVocalization: state.settings.showVocalization,
  showTranscription: state.settings.showTranscription,
  romanizationStandard: state.settings.romanizationStandard,
});

configureAnchors({
  offset: -73,
  keepLastAnchorHash: true,
});

const arabicWordRegExp = /[\u0600-\u06FF]+/g;

const styles = (theme: Theme) => {
  return createStyles({
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      margin: theme.spacing(1),
    },
    list: {
      listStyleType: 'none',
      userSelect: 'none',
      backgroundColor: grey[100],
      padding: theme.spacing(2),
      margin: 0,
      marginBottom: theme.spacing(4),
    },
    listItem: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginRight: theme.spacing(2),
    },
    nl: {
      flex: 1,
      textAlign: 'right',
    },
    ar: {
      flex: 1,
      fontSize: 28,
      textAlign: 'right',
      color: theme.palette.primary.dark,
      '&>span[lang="ar"]': {
        cursor: 'pointer',
      },
      marginRight: theme.spacing(2),
    },
    rom: {
      flex: 1,
      fontFamily: 'Georgia',
      fontStyle: 'italic',
      textAlign: 'center',
    },
    hashMatch: {
      backgroundColor: `${pink[50]}!important`,
    },
  });
};

interface Params {
  publication: string;
  article: string;
}

interface OwnProps {
  match: match<Params>;
  lemmas: Lemma[];
  showVocalization: boolean;
  showTranscription: boolean;
  romanizationStandard: string;
}

type Props = OwnProps & RouteComponentProps & WithStyles<typeof styles>;

const LemmaList: React.FC<Props> = props => {
  const {
    lemmas,
    classes,
    history,
    showVocalization,
    showTranscription,
    romanizationStandard,
  } = props;
  const { publication, article } = props.match.params;

  const [hashId, setHashId] = useState('');
  const [goFlashcards, setGoFlashcards] = useState<boolean>(false);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { hash } = history.location;
    setHashId(hash ? hash.slice(1) : '');
  }, []);

  const onGoFlashcards = () => setGoFlashcards(true);

  const renderLemma = (lemma: Lemma, index: number) => {
    const arabicText = showVocalization
      ? lemma.ar
      : Transcoder.stripTashkeel(lemma.ar);
    const arabicHtml = arabicText.replace(
      arabicWordRegExp,
      '<span lang="ar">$&</span>',
    );
    const listClasses =
      lemma._id === hashId
        ? `${classes.listItem} ${classes.hashMatch}`
        : classes.listItem;
    return (
      <ScrollableAnchor key={index} id={lemma._id}>
        <li className={listClasses}>
          <Typography variant="body1" className={classes.nl}>
            {lemma.nl}
          </Typography>
          <Typography
            dir="rtl"
            className={classes.ar}
            dangerouslySetInnerHTML={{ __html: arabicHtml }}
          />
          {lemma.rom && showTranscription && (
            <Typography variant="body1" className={classes.rom}>
              {Transcoder.applyRomanization(lemma.rom, romanizationStandard)}
            </Typography>
          )}
        </li>
      </ScrollableAnchor>
    );
  };

  if (goFlashcards) {
    return <Redirect to={`/content/${publication}/${article}/flashcards`} />;
  }

  return (
    <>
      <div className={classes.buttonContainer}>
        <Button variant="outlined" color="primary" onClick={onGoFlashcards}>
          {C.FLASHCARDS}
        </Button>
      </div>
      <ul className={classes.list}>{lemmas.map(renderLemma)}</ul>
    </>
  );
};

export default connect(mapStateToProps)(
  withRouter(withStyles(styles)(LemmaList)),
);
