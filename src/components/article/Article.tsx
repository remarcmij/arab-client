import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchArticle } from '../../actions/content';
import { RootState } from '../../reducers';
import withNavBar from '../withNavBar';
import WordClickHandler from '../WordClickHandler';
import ArticleContent from './ArticleContent';

type Props = Readonly<{
  setNavBackRoute: (to: string) => void;
}>;

const Article: React.FC<Props> = props => {
  const { publication, article } = useParams();
  const dispatch = useDispatch();
  const { article: topic, loading, error } = useSelector(
    (state: RootState) => state.content,
  );

  const { setNavBackRoute } = props;
  const filename = `${publication}.${article}`;
  const topicLoaded = topic && topic.filename === filename;
  const backTo = `/content/${publication}`;

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
    <WordClickHandler>
      <ArticleContent topic={topic} />
    </WordClickHandler>
  );
};

export default withNavBar(Article);
