import Button from '@material-ui/core/Button';
import grey from '@material-ui/core/colors/grey';
import pink from '@material-ui/core/colors/pink';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import ScrollableAnchor, { configureAnchors } from 'react-scrollable-anchor';
import { ILemma, ITopic } from 'Types';
import { getLanguageService } from '../../../services/language';
import clsx from 'clsx';

configureAnchors({
  offset: -73,
  keepLastAnchorHash: true,
});

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
    native: {
      flex: 1,
    },
    foreign: {
      flex: 1,
      color: theme.palette.primary.dark,
      '&>span[lang]': {
        cursor: 'pointer',
      },
      marginRight: theme.spacing(2),
    },
    enlarged: {
      fontSize: 28,
    },
    alignRight: {
      textAlign: 'right',
    },
    notes: {
      flex: 1,
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
  const history = useHistory();
  const { t } = useTranslation();
  const { publication, article } = useParams();
  const [hashId, setHashId] = useState('');
  const [toFlashcards, setToFlashcards] = useState(false);

  const { lemmas: allLemmas } = topic;
  const lemmas =
    (allLemmas &&
      allLemmas.filter(lemma => lemma.sectionIndex === sectionIndex)) ??
    [];

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { hash } = history.location;
    setHashId(hash ? hash.slice(1) : '');
  }, []);

  const renderLemma = (lemma: ILemma, index: number) => {
    const foreignLS = getLanguageService(topic.foreignLang);
    const nativeLS = getLanguageService(topic.nativeLang);
    const foreignText = foreignLS.formatForDisplay(lemma.foreign);
    const listClasses =
      lemma._id === hashId
        ? clsx(classes.listItem, classes.hashMatch)
        : classes.listItem;
    return (
      <ScrollableAnchor key={index} id={lemma._id}>
        <li className={listClasses}>
          <Typography
            variant="body1"
            dir={nativeLS.dir}
            className={clsx(
              classes.native,
              foreignLS.dir === 'rtl' && classes.alignRight,
            )}
          >
            {nativeLS.formatForDisplay(lemma.native)}
          </Typography>
          <Typography
            dir={foreignLS.dir}
            className={clsx(
              classes.foreign,
              foreignLS.useEnlargedFont && classes.enlarged,
              foreignLS.dir === 'rtl' && classes.alignRight,
            )}
            dangerouslySetInnerHTML={{
              __html: `<span lang=${topic.foreignLang}>${foreignText}</span>`,
            }}
          />
          {lemma.roman && (
            <Typography variant="body1" className={classes.notes}>
              {lemma.roman}
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
