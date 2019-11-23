import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { fetchArticle } from '../actions';
import LemmaFlashcards from './LemmaFlashcards';

const Flashcards: React.FC = () => {
  const dispatch = useDispatch();
  const {
    content: { article: topic, loading, error },
    settings: { showVocalization, voiceName },
  } = useSelector((state: RootState) => state);
  const { publication, article, index } = useParams();

  const sectionIndex = (index && parseInt(index, 10)) || 0;

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;

  useNavBackRoute(`/content/${publication}/${article}`);
  useEffect(() => {
    if (!topicLoaded) {
      dispatch(fetchArticle(filename));
    }
  }, [dispatch, filename, topicLoaded]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!topic) {
    return null;
  }

  return (
    <>
      {topic && (
        <Grid container={true} justify="center">
          <Grid item={true} xs={12} md={10} lg={8}>
            <LemmaFlashcards
              topic={topic}
              sectionIndex={sectionIndex}
              showVocalization={showVocalization}
              voiceName={voiceName}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Flashcards;
