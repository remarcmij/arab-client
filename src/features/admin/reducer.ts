import { ITopic } from 'Types';
import { ActionType } from 'typesafe-actions';
import {
  CLEAR_UPLOADS,
  FETCH_ERROR,
  FETCH_TOPICS,
  FETCH_TOPICS_SUCCESS,
  UPLOAD_FAIL,
  UPLOAD_START,
  UPLOAD_SUCCESS,
} from './constants';

type UploadStatus = 'pending' | 'success' | 'warning' | 'fail';

type Upload = {
  uuid: string;
  file: File;
  status: UploadStatus;
};

export type State = Readonly<{
  uploads: ReadonlyArray<Upload>;
  topics: ITopic[];
  loading: boolean;
  error: Error | null;
}>;

type AdminAction = ActionType<typeof import('./actions')>;

const initialState: State = {
  uploads: [],
  topics: [],
  loading: false,
  error: null,
};

type UploadState = State['uploads'];

const handleStatusUpdate = (
  uuid: string,
  upload: Upload,
  status: UploadStatus,
) => (upload.uuid === uuid ? { ...upload, status } : upload);

const uploads = (uploads: UploadState, action: AdminAction): UploadState => {
  switch (action.type) {
    case UPLOAD_START:
      return [...uploads, { ...action.payload, status: 'pending' }];
    case UPLOAD_SUCCESS:
      return uploads.map(upload =>
        handleStatusUpdate(
          action.payload.uuid,
          upload,
          action.payload.disposition === 'success' ? 'success' : 'warning',
        ),
      );
    case UPLOAD_FAIL:
      return uploads.map(upload =>
        handleStatusUpdate(action.payload, upload, 'fail'),
      );
    default:
      return uploads;
  }
};

export default (state: State = initialState, action: AdminAction): State => {
  switch (action.type) {
    case FETCH_TOPICS:
      return { ...state, loading: true, error: null };
    case FETCH_TOPICS_SUCCESS:
      return { ...state, topics: action.payload, loading: false };
    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
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
