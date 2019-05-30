import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Topic } from 'Types';
import { action } from 'typesafe-actions';
import handleApiError from '../utils/handleApiErrors';
import {
  FETCH_START,
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ERROR,
} from './constants';
import { AnyAction } from 'redux';

const fetchStart = () => action(FETCH_START);

const fetchPublicationsSuccess = (publications: Topic[]) =>
  action(FETCH_PUBLICATIONS_SUCCESS, publications);

const fetchArticlesSuccess = (articles: Topic[]) =>
  action(FETCH_ARTICLES_SUCCESS, articles);

const fetchArticleSuccess = (article: Topic) =>
  action(FETCH_ARTICLE_SUCCESS, article);

export const fetchError = (error: any) => action(FETCH_ERROR, error);

export type ContentActions =
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchPublicationsSuccess>
  | ReturnType<typeof fetchArticlesSuccess>
  | ReturnType<typeof fetchArticleSuccess>
  | ReturnType<typeof fetchError>;

export const fetchPublications = (): ThunkAction<
  void,
  void,
  void,
  AnyAction
> => async dispatch => {
  try {
    dispatch(fetchStart());
    const res = await axios('/api');
    dispatch(fetchPublicationsSuccess(res.data));
  } catch (err) {
    handleApiError(err, dispatch);
  }
};

export const fetchArticles = (
  publication: string,
): ThunkAction<void, void, void, AnyAction> => async dispatch => {
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

export const fetchArticle = (
  filename: string,
): ThunkAction<void, void, void, AnyAction> => async dispatch => {
  try {
    dispatch(fetchStart());
    const res = await axios(`/api/article/${filename}`);
    dispatch(fetchArticleSuccess(res.data));
  } catch (err) {
    handleApiError(err, dispatch);
  }
};
