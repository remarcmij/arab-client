import { withTheme, WithTheme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { match } from 'react-router';
import { Topic } from 'Types';
import LemmaArticle from '../components/LemmaArticle';
import withNavBar from '../components/withNavBar';
import WordClickHandler from '../components/WordClickHandler';

interface Params {
  publication: string;
  article: string;
}

interface OwnProps {
  match: match<Params>;
  setNavBackRoute: (to: string) => void;
  fetchArticle: (filename: string) => void;
  topic: Topic | null;
  loading: boolean;
  error: any;
}

type Props = OwnProps & WithTheme;

const Article: React.FC<Props> = props => {
  const { fetchArticle, topic, loading, error, setNavBackRoute } = props;
  const { publication, article } = props.match.params;

  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;
  const backTo = `/content/${publication}`;

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
    <WordClickHandler>
      <LemmaArticle document={topic} />
    </WordClickHandler>
  );
};

export default withNavBar(withTheme(Article));
