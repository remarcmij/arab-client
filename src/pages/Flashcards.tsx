import Grid from '@material-ui/core/Grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../actions/content';
import LemmaFlashcards from '../components/LemmaFlashcards';
import withNavBar from '../components/withNavBar';
import { RootState } from '../reducers';

type Props = Readonly<{
  setNavBackRoute: (to: string) => void;
}>;

const Flashcards: React.FC<Props> = props => {
  const dispatch = useDispatch();
  const {
    content: { article: topic, loading, error },
    settings: { showVocalization, voiceName },
  } = useSelector((state: RootState) => state);
  const { setNavBackRoute } = props;
  const { publication, article } = useParams();

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;
  const backTo = `/content/${publication}/${article}`;

  useEffect(() => {
    setNavBackRoute(backTo);
    if (!topicLoaded) {
      dispatch(fetchArticle(filename));
    }
  }, [dispatch, filename, topicLoaded, setNavBackRoute, backTo]);

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

export default withNavBar(Flashcards);
