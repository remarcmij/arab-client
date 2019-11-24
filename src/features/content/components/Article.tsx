import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import { fetchArticle } from '../actions';
import ArticleContent from './ArticleContent';
import WordClickHandler from './WordClickHandler';

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
    <WordClickHandler>
      <ArticleContent topic={topic} />
    </WordClickHandler>
  );
};

export default Article;
