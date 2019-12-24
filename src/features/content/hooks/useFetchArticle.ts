import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import {
  fetchArticleAsync,
  fetchPublicationsAsync,
  setCurrentPublication,
} from '../actions';

const useFetchArticle = (publication: string, article: string) => {
  const dispatch = useDispatch();
  const { article: topic, publications, currentPublication } = useSelector(
    (state: RootState) => state.content,
  );

  useEffect(() => {
    if (publications.length === 0) {
      dispatch(fetchPublicationsAsync());
    } else if (currentPublication?.publication !== publication) {
      dispatch(setCurrentPublication(publication));
    }
  }, [dispatch, publication, publications, currentPublication]);

  useEffect(() => {
    const filename = `${publication}.${article}`;
    if (!(topic && topic.filename === filename)) {
      dispatch(fetchArticleAsync(filename));
    }
  }, [dispatch, article, publication, topic]);
};

export default useFetchArticle;
