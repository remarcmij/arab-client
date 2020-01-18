import axios from 'axios';
import { ITopic } from 'Types';
import {
  createAction,
  createAsyncAction,
  ThunkDispatchAny,
} from 'typesafe-actions';
import uuidv4 from 'uuid/v4';
import handleAxiosErrors from '../../utils/handleAxiosErrors';
import { resetContent } from '../content/actions';
import { User } from '../auth/actions';

export type UploadDisposition = 'success' | 'unchanged' | 'fail';

export const fetchUsers = createAsyncAction(
  '@admin/FETCH_USERS_REQUEST',
  '@admin/FETCH_USERS_SUCCESS',
  '@admin/FETCH_USERS_FAILURE',
)<undefined, User[], any>();

export const fetchUsersAsync = () => async (dispatch: ThunkDispatchAny) => {
  try {
    dispatch(fetchUsers.request());
    const res = await axios(`/api/users/all`);
    dispatch(fetchUsers.success(res.data));
  } catch (err) {
    dispatch(fetchUsers.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};

export const authorizeUser = createAsyncAction(
  '@admin/AUTHORIZE_USER_REQUEST',
  '@admin/AUTHORIZE_USER_SUCCESS',
  '@admin/AUTHORIZE_USER_FAILURE',
)<undefined, User, any>();

type userUpdateAuthType = { authorize: boolean; email: string };

export const authorizeUserAsync = (data: userUpdateAuthType) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(authorizeUser.request());
    const res = await axios.patch(`/api/user/authorize`, data);
    dispatch(authorizeUser.success(res.data));
  } catch (err) {
    dispatch(authorizeUser.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};

export const deleteUser = createAsyncAction(
  '@admin/DELETE_USER_REQUEST',
  '@admin/DELETE_USER_SUCCESS',
  '@admin/DELETE_USER_FAILURE',
)<undefined, { message: string }, any>();

type deleteUserAsyncType = { email: string };

export const deleteUserAsync = (data: deleteUserAsyncType) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(deleteUser.request());
    const res = await axios.delete(`/api/user`, { data });
    dispatch(fetchUsersAsync());
    dispatch(deleteUser.success(res.data));
  } catch (err) {
    dispatch(deleteUser.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};

export const fetchTopics = createAsyncAction(
  '@admin/FETCH_TOPICS_REQUEST',
  '@admin/FETCH_TOPICS_SUCCESS',
  '@admin/FETCH_TOPICS_FAILURE',
)<undefined, ITopic[], any>();

export const fetchTopicsAsync = () => async (dispatch: ThunkDispatchAny) => {
  try {
    dispatch(fetchTopics.request());
    const res = await axios('/api/all');
    dispatch(fetchTopics.success(res.data));
  } catch (err) {
    dispatch(fetchTopics.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};

export const deleteTopic = createAsyncAction(
  '@admin/DELETE_TOPIC_REQUEST',
  '@admin/DELETE_TOPIC_SUCCESS',
  '@admin/DELETE_TOPIC_FAILURE',
)<undefined, ITopic[], any>();

export const deleteTopicAsync = (filename: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(deleteTopic.request());
    const res = await axios.delete(`/api/topic/${filename}`);
    dispatch(deleteTopic.success(res.data));
    dispatch(resetContent());
  } catch (err) {
    dispatch(deleteTopic.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};

export const clearUploads = createAction('@admin/CLEAR_UPLOADS')();

type UploadRequestPayload = { file: File; uuid: string };
type UploadSuccessPayload = { uuid: string; disposition: string };
type UploadFailurePayload = { error: any; uuid: string };

export const uploadFile = createAsyncAction(
  '@admin/UPLOAD_REQUEST',
  '@admin/UPLOAD_SUCCESS',
  '@admin/UPLOAD_FAILURE',
)<UploadRequestPayload, UploadSuccessPayload, UploadFailurePayload>();

export const uploadFileAsync = (file: File) => async (
  dispatch: ThunkDispatchAny,
) => {
  const body = new FormData();
  body.append('file', file);

  const uuid = uuidv4();

  try {
    dispatch(uploadFile.request({ file, uuid }));
    const {
      data: { disposition },
    } = await axios.post('/api/upload', body, {});
    dispatch(uploadFile.success({ uuid, disposition }));
    dispatch(resetContent());
  } catch (error) {
    dispatch(uploadFile.failure({ error, uuid }));
  }
};
