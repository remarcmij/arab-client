import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import {
  fetchArticleAsync,
  fetchPublicationsAsync,
  loadFilters,
} from '../actions';

const useFetchArticle = (publication: string, article: string) => {
  const dispatch = useDispatch();
  const { article: topic, publications } = useSelector(
    (state: RootState) => state.content,
  );

  useEffect(() => {
    if (publications.length === 0) {
      dispatch(fetchPublicationsAsync());
    } else {
      dispatch(loadFilters(publication));
    }
  }, [dispatch, publication, publications]);

  useEffect(() => {
    const filename = `${publication}.${article}`;
    if (!(topic && topic.filename === filename)) {
      dispatch(fetchArticleAsync(filename));
    }
  }, [dispatch, article, publication, topic]);
};

export default useFetchArticle;
