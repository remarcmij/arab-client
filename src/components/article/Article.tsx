import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../actions/content';
import { RootState } from '../../reducers';
import useNavBackRoute from '../useNavBackRoute';
import WordClickHandler from '../WordClickHandler';
import ArticleContent from './ArticleContent';

const Article: React.FC = () => {
  const { publication, article } = useParams();
  const dispatch = useDispatch();
  const { article: topic, loading, error } = useSelector(
    (state: RootState) => state.content,
  );
  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;

  useNavBackRoute(`/content/${publication}`);
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
    <WordClickHandler>
      <ArticleContent topic={topic} />
    </WordClickHandler>
  );
};

export default Article;
