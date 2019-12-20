import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from 'typesafe-actions';
import Spinner from '../../../layout/components/Spinner';
import useNavBackRoute from '../../../layout/hooks/useNavBackRoute';
import useFetchArticle from '../hooks/useFetchArticle';
import ArticleContent from './ArticleContent';
import WordClickHandler from './WordClickHandler';

const Article: React.FC = () => {
  const { publication, article } = useParams();
  const { article: topic, loading, error } = useSelector(
    (state: RootState) => state.content,
  );

  useNavBackRoute(`/content/${publication}`);

  useFetchArticle(publication!, article!);

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
