import axios from 'axios';
import uuidv4 from 'uuid/v4';
import { action, ThunkDispatchAny } from 'typesafe-actions';
import {
  CLEAR_UPLOADS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
} from './constants';

export const clearUploads = () => action(CLEAR_UPLOADS);
export const uploadStart = (file: File, uuid: string) =>
  action(UPLOAD_START, { file, uuid });
export const uploadSuccess = (uuid: string) => action(UPLOAD_SUCCESS, uuid);
export const uploadFail = (uuid: string) => action(UPLOAD_FAIL, uuid);

export const uploadFile = (file: File) => async (
  dispatch: ThunkDispatchAny,
) => {
  console.log('file :', file);

  const body = new FormData();
  body.append('file', file);

  const uuid = uuidv4();

  try {
    dispatch(uploadStart(file, uuid));
    await axios.post('/api/upload', body, {});
    dispatch(uploadSuccess(uuid));
  } catch (err) {
    console.error('err', err);
    dispatch(uploadFail(uuid));
  }
};
