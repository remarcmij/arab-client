import Grid from '@material-ui/core/Grid';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { fetchArticleAsync } from '../../content/actions';
import FlashcardBody from './FlashcardBody';
import FlashcardHeader from './FlashcardHeader';
import FlashcardsController from './FlashcardsController';
import { ILemma } from 'Types';

const Flashcards: React.FC = () => {
  const { publication, article, index: indexParam = '0' } = useParams();

  const dispatch = useDispatch();
  const {
    content: { article: topic, loading, error },
    settings: { showVocalization, foreignVoice },
  } = useSelector((state: RootState) => state);

  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [lemma, setLemma] = useState<ILemma | undefined>();

  useNavBackRoute(`/content/${publication}/${article}`);

  const filename = `${publication}.${article}`;

  useEffect(() => {
    const topicLoaded = topic?.filename === filename;
    if (!topicLoaded) {
      dispatch(fetchArticleAsync(filename));
    }
  }, [topic, filename, dispatch]);

  const lemmas = useMemo(() => {
    const lemmas = topic?.lemmas ?? [];
    // Index in url params is one-based; zero means:
    // all lemmas from all sections
    let sectionIndex = parseInt(indexParam, 10) || 0;
    if (sectionIndex === 0) {
      return lemmas;
    }
    sectionIndex -= 1;
    return lemmas.filter(lemma => lemma.sectionIndex === sectionIndex);
  }, [topic, indexParam]);

  const onUpdate = useCallback(
    (lemma: ILemma, index: number, showTranslation: boolean) => {
      setLemma(lemma);
      setIndex(index);
      setShowTranslation(showTranslation);
    },
    [],
  );

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!topic || topic.lemmas!.length === 0) {
    return null;
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
            {lemma && (
              <FlashcardBody
                lemma={lemma!}
                showTranslation={showTranslation}
                showVocalization={showVocalization}
                foreignVoice={foreignVoice}
              />
            )}
            <FlashcardsController lemmas={lemmas} onUpdate={onUpdate} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Flashcards;
