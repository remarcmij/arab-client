import Grid from '@material-ui/core/Grid';
import { withTheme, WithTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { match } from 'react-router';
import { Topic } from 'Types';
import LemmaFlashcards from '../components/LemmaFlashcards';
import withNavBar from '../components/withNavBar';
import { useSettingsContext } from '../contexts/settings';

interface Params {
  publication: string;
  article: string;
}

type OwnProps = {
  match: match<Params>;
  setNavBackRoute: (to: string) => void;
  fetchArticle: (filename: string) => void;
  topic: Topic | null;
  loading: boolean;
  error: any;
};

type Props = OwnProps & WithTheme;

const Flashcards: React.FC<Props> = props => {
  const { fetchArticle, topic, loading, error, setNavBackRoute } = props;
  const { publication, article } = props.match.params;

  const { settings } = useSettingsContext();

  const { showVocalization, voiceName } = settings;

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;
  const backTo = `/content/${publication}/${article}`;

  useEffect(() => {
    setNavBackRoute(backTo);
    if (!topicLoaded) {
      fetchArticle(filename);
    }
  }, [fetchArticle, filename, topicLoaded, setNavBackRoute, backTo]);

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

export default withNavBar(withTheme(Flashcards));
