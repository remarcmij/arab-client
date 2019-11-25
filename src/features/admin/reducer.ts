import { ITopic } from 'Types';
import { ActionType, getType } from 'typesafe-actions';
import { clearUploads, deleteTopic, fetchTopics, uploadFile } from './actions';

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
  error?: any;
}>;

type AdminAction = ActionType<typeof import('./actions')>;

const initialState: State = {
  uploads: [],
  topics: [],
  loading: false,
};

const handleStatusUpdate = (
  uuid: string,
  upload: Upload,
  status: UploadStatus,
) => (upload.uuid === uuid ? { ...upload, status } : upload);

const reducer = (state = initialState, action: AdminAction): State => {
  switch (action.type) {
    case getType(fetchTopics.request):
    case getType(deleteTopic.request):
      return { ...state, loading: true, error: null };

    case getType(fetchTopics.success):
    case getType(deleteTopic.success):
      return { ...state, topics: action.payload, loading: false };

    case getType(fetchTopics.failure):
    case getType(deleteTopic.failure):
      return { ...state, error: action.payload, loading: false };

    case getType(uploadFile.request):
      return {
        ...state,
        uploads: [...state.uploads, { ...action.payload, status: 'pending' }],
      };

    case getType(uploadFile.success): {
      const uploads = state.uploads.map(upload =>
        handleStatusUpdate(
          action.payload.uuid,
          upload,
          action.payload.disposition === 'success' ? 'success' : 'warning',
        ),
      );
      return { ...state, uploads };
    }

    case getType(uploadFile.failure): {
      const { error, uuid } = action.payload;
      const uploads = state.uploads.map(upload =>
        handleStatusUpdate(uuid, upload, 'fail'),
      );
      return { ...state, uploads, error };
    }

    case getType(clearUploads):
      return { ...state, uploads: [] };

    default:
      return state;
  }
};

export default reducer;
