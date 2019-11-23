import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { ILemma, ITopic } from 'Types';
import { RootState } from 'typesafe-actions';
import Transcoder from '../../../services/Transcoder';

configureAnchors({
  offset: -73,
  keepLastAnchorHash: true,
});

const arabicWordRegExp = /[\u0600-\u06FF]+/g;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

type Props = {
  topic: ITopic;
  sectionIndex: number;
};

const LemmaList: React.FC<Props> = ({ topic, sectionIndex }) => {
  const classes = useStyles();
  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
  } = useSelector((state: RootState) => state.settings);
  const history = useHistory();
  const { t } = useTranslation();
  const { publication, article } = useParams();
  const [hashId, setHashId] = useState('');
  const [toFlashcards, setToFlashcards] = useState(false);

  const { lemmas: allLemmas } = topic;
  const lemmas =
    (allLemmas &&
      allLemmas.filter(lemma => lemma.sectionIndex === sectionIndex)) ||
    [];

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { hash } = history.location;
    setHashId(hash ? hash.slice(1) : '');
  }, []);

  const renderLemma = (lemma: ILemma, index: number) => {
    const arabicText = showVocalization
      ? lemma.foreign
      : Transcoder.stripTashkeel(lemma.foreign);
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
            {lemma.native}
          </Typography>
          <Typography
            dir="rtl"
            className={classes.ar}
            dangerouslySetInnerHTML={{ __html: arabicHtml }}
          />
          {lemma.roman && showTranscription && (
            <Typography variant="body1" className={classes.rom}>
              {Transcoder.applyRomanization(lemma.roman, romanizationStandard)}
            </Typography>
          )}
        </li>
      </ScrollableAnchor>
    );
  };

  if (toFlashcards) {
    return (
      <Redirect
        to={`/content/${publication}/${article}/flashcards/${sectionIndex + 1}`}
      />
    );
  }

  return (
    <>
      <div className={classes.buttonContainer}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setToFlashcards(true)}
        >
          {t('flashcards')}
        </Button>
      </div>
      <ul className={classes.list}>{lemmas.map(renderLemma)}</ul>
    </>
  );
};

export default LemmaList;
