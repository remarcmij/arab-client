import axios from 'axios';
import { ITopic } from 'Types';
import {
  createAction,
  createAsyncAction,
  ThunkDispatchAny,
} from 'typesafe-actions';
import handleAxiosErrors from '../../utils/handleAxiosErrors';

export const fetchPublications = createAsyncAction(
  '@content/FETCH_PUBLICATIONS_REQUEST',
  '@content/FETCH_PUBLICATIONS_SUCCESS',
  '@content/FETCH_PUBLICATIONS_FAILURE',
)<void, ITopic[], any>();

export const fetchPublicationsAsync = () => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(fetchPublications.request());
    const res = await axios('/api');
    dispatch(fetchPublications.success(res.data));
  } catch (error) {
    dispatch(fetchPublications.failure(error));
    handleAxiosErrors(error, dispatch);
  }
};

export const fetchArticles = createAsyncAction(
  '@content/FETCH_ARTICLES_REQUEST',
  '@content/FETCH_ARTICLES_SUCCESS',
  '@content/FETCH_ARTICLES_FAILURE',
)<void, ITopic[], any>();

export const fetchArticlesAsync = (publication: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(fetchArticles.request());
    const res = await axios(`/api/index/${publication}`);
    dispatch(fetchArticles.success(res.data));
  } catch (error) {
    dispatch(fetchArticles.failure(error));
    handleAxiosErrors(error, dispatch);
  }
};

export const fetchArticle = createAsyncAction(
  '@content/FETCH_ARTICLE_REQUEST',
  '@content/FETCH_ARTICLE_SUCCESS',
  '@content/FETCH_ARTICLE_FAILURE',
)<void, ITopic, any>();

export const fetchArticleAsync = (filename: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(fetchArticle.request());
    const res = await axios(`/api/article/${filename}`);
    dispatch(fetchArticle.success(res.data));
  } catch (error) {
    dispatch(fetchArticle.failure(error));
    handleAxiosErrors(error, dispatch);
  }
};

export const resetContent = createAction('@content/RESET')<void>();
