import axios from 'axios';
import { ITopic } from 'Types';
import { action } from 'typesafe-actions';
import handleApiError from '../utils/handleApiErrors';
import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ERROR,
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_START,
} from './constants';
import { ThunkDispatchAny } from './types';

const fetchStart = () => action(FETCH_START);

const fetchPublicationsSuccess = (publications: ITopic[]) =>
  action(FETCH_PUBLICATIONS_SUCCESS, publications);

const fetchArticlesSuccess = (articles: ITopic[]) =>
  action(FETCH_ARTICLES_SUCCESS, articles);

const fetchArticleSuccess = (article: ITopic) =>
  action(FETCH_ARTICLE_SUCCESS, article);

export const fetchError = (error: any) => action(FETCH_ERROR, error);

export type ContentActions =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchPublicationsSuccess>
  | ReturnType<typeof fetchArticlesSuccess>
  | ReturnType<typeof fetchArticleSuccess>
  | ReturnType<typeof fetchError>;

export const fetchPublications = () => async (dispatch: ThunkDispatchAny) => {
  try {
    dispatch(fetchStart());
    const res = await axios('/api');
    dispatch(fetchPublicationsSuccess(res.data));
  } catch (err) {
    handleApiError(err, dispatch);
  }
};

export const fetchArticles = (publication: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(fetchStart());
    const res = await axios(`/api/index/${publication}`);
    dispatch(fetchArticlesSuccess(res.data));
  } catch (err) {
    dispatch(
      fetchError({
        message: err.response.statusText,
        status: err.response.status,
      }),
    );
    handleApiError(err, dispatch);
  }
};

export const fetchArticle = (filename: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(fetchStart());
    const res = await axios(`/api/article/${filename}`);
    dispatch(fetchArticleSuccess(res.data));
  } catch (err) {
    handleApiError(err, dispatch);
  }
};
