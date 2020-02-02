import Grid from '@material-ui/core/Grid';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import useFetchArticle from '../../content/hooks/useFetchArticle';
import FlashcardBody from './FlashcardBody';
import FlashcardHeader from './FlashcardHeader';
import FlashcardsController from './FlashcardsController';

const Flashcards: React.FC = () => {
  const { publication, article, index: indexParam = '0' } = useParams();

  const { article: topic, loading, error } = useSelector(
    (state: RootState) => state.content,
  );

  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const [lemma, setLemma] = useState<ILemma | undefined>();

  useNavBackRoute(`/content/${publication}/${article}`);

  useFetchArticle(publication!, article!);

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
              <FlashcardBody lemma={lemma!} showTranslation={showTranslation} />
            )}
            <FlashcardsController lemmas={lemmas} onUpdate={onUpdate} />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Flashcards;
