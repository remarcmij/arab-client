import { ActionType } from 'typesafe-actions';
import {
  CLEAR_UPLOADS,
  UPLOAD_START,
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
} from './constants';

export type State = Readonly<{
  uploads: ReadonlyArray<{
    uuid: string;
    file: File;
    status: 'pending' | 'success' | 'fail';
  }>;
}>;

type AdminAction = ActionType<typeof import('./actions')>;

const initialState: State = { uploads: [] };

type UploadState = State['uploads'];

const uploads = (uploads: UploadState, action: AdminAction): UploadState => {
  switch (action.type) {
    case UPLOAD_START:
      return [...uploads, { ...action.payload, status: 'pending' }];
    case UPLOAD_SUCCESS:
      return uploads.map(upload =>
        upload.uuid === action.payload
          ? { ...upload, status: 'success' }
          : upload,
      );
    case UPLOAD_FAIL:
      return uploads.map(upload =>
        upload.uuid === action.payload ? { ...upload, status: 'fail' } : upload,
      );
    default:
      return uploads;
  }
};

export default (state: State = initialState, action: AdminAction): State => {
  switch (action.type) {
    case UPLOAD_START:
    case UPLOAD_SUCCESS:
    case UPLOAD_FAIL:
      return { ...state, uploads: uploads(state.uploads, action) };
    case CLEAR_UPLOADS:
      return { ...state, uploads: [] };
    default:
      return state;
  }
};
