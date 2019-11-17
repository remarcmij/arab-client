import axios from 'axios';
import { ITopic } from 'Types';
import { action, ThunkDispatchAny } from 'typesafe-actions';
import uuidv4 from 'uuid/v4';
import handleAxiosErrors from '../../utils/handleAxiosErrors';
import {
  CLEAR_UPLOADS,
  DELETE_TOPIC_SUCCESS,
  DELETE_TOPIC,
  FETCH_ERROR,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS,
  UPLOAD_FAIL,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from './constants';
import { reset } from '../content/actions';

export type UploadDisposition = 'success' | 'unchanged' | 'fail';

export const fetchStart = () => action(FETCH_TOPICS);

export const fetchTopicsSuccess = (topics: ITopic[]) =>
  action(FETCH_TOPICS_SUCCESS, topics);

export const fetchError = (error: any) => action(FETCH_ERROR, error);

export const fetchTopics = () => async (dispatch: ThunkDispatchAny) => {
  try {
    dispatch(fetchStart());
    const res = await axios('/api/all');
    dispatch(fetchTopicsSuccess(res.data));
  } catch (err) {
    dispatch(
      fetchError({
        message: err.response.statusText,
        status: err.response.status,
      }),
    );
    handleAxiosErrors(err, dispatch);
  }
};

export const deleteTopicStart = () => action(DELETE_TOPIC);
export const deleteTopicSuccess = () => action(DELETE_TOPIC_SUCCESS);

export const deleteTopic = (filename: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(deleteTopicStart());
    const res = await axios.delete(`/api/topic/${filename}`);
    dispatch(fetchTopicsSuccess(res.data));
    dispatch(reset());
  } catch (err) {
    dispatch(
      fetchError({
        message: err.response.statusText,
        status: err.response.status,
      }),
    );
    handleAxiosErrors(err, dispatch);
  }
};

export const clearUploads = () => action(CLEAR_UPLOADS);
export const uploadStart = (file: File, uuid: string) =>
  action(UPLOAD_START, { file, uuid });
export const uploadSuccess = (uuid: string, disposition: string) =>
  action(UPLOAD_SUCCESS, { uuid, disposition });
export const uploadFail = (uuid: string) => action(UPLOAD_FAIL, uuid);

export const uploadFile = (file: File) => async (
  dispatch: ThunkDispatchAny,
) => {
  const body = new FormData();
  body.append('file', file);

  const uuid = uuidv4();

  try {
    dispatch(uploadStart(file, uuid));
    const {
      data: { disposition },
    } = await axios.post('/api/upload', body, {});
    dispatch(uploadSuccess(uuid, disposition));
    dispatch(reset());
  } catch (err) {
    console.error('err', err);
    dispatch(uploadFail(uuid));
  }
};
