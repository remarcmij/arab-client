import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../actions/content';
import LemmaFlashcards from '../components/LemmaFlashcards';
import useNavBackRoute from '../components/useNavBackRoute';
import { RootState } from '../reducers';

const Flashcards: React.FC = () => {
  const dispatch = useDispatch();
  const {
    content: { article: topic, loading, error },
    settings: { showVocalization, voiceName },
  } = useSelector((state: RootState) => state);
  const { publication, article } = useParams();

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;

  useNavBackRoute(`/content/${publication}/${article}`);
  useEffect(() => {
    if (!topicLoaded) {
      dispatch(fetchArticle(filename));
    }
  }, [dispatch, filename, topicLoaded]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !topic) {
    return null;
  }

  return (
    <>
      {topic && (
        <Grid container={true} justify="center">
          <Grid item={true} xs={12} md={10} lg={8}>
            <LemmaFlashcards
              document={topic}
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
