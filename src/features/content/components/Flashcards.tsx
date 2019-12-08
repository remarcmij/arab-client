import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { fetchArticleThunk } from '../actions';
import FlashcardBody from './FlashcardBody';
import FlashcardHeader from './FlashcardHeader';
import FlashcardsController from './FlashcardsController';

const Flashcards: React.FC = () => {
  const { publication, article, index: sectionIndex } = useParams();

  const dispatch = useDispatch();
  const {
    content: { article: topic, loading, error },
    settings: { showVocalization, voiceName },
  } = useSelector((state: RootState) => state);

  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [index, setIndex] = useState(-1);

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;

  useNavBackRoute(`/content/${publication}/${article}`);

  useEffect(() => {
    if (!topicLoaded) {
      dispatch(fetchArticleThunk(filename));
    }
  }, [dispatch, filename, topicLoaded]);

  const onUpdate = useCallback((index: number, showTranslation: boolean) => {
    setIndex(index);
    setShowTranslation(showTranslation);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!topic) {
    return null;
  }

  const { lemmas: allLemmas = [] } = topic;

  const newIndex = (sectionIndex && parseInt(sectionIndex, 10)) || 0;
  let lemmas = allLemmas;
  if (newIndex !== 0) {
    const indexNum = newIndex - 1;
    lemmas = lemmas.filter(lemma => lemma.sectionIndex === indexNum);
  }

  return (
    <>
      {topic && (
        <Grid container={true} justify="center">
          <Grid item={true} xs={12} md={10} lg={8}>
            <FlashcardHeader
              topic={topic}
              index={index}
              length={lemmas.length}
            />
            {lemmas.length !== 0 && index !== -1 && (
              <FlashcardBody
                lemma={lemmas[index]}
                showTranslation={showTranslation}
                showVocalization={showVocalization}
                voiceName={voiceName}
              />
            )}
            <FlashcardsController
              lemmaCount={lemmas.length}
              onUpdate={onUpdate}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Flashcards;
