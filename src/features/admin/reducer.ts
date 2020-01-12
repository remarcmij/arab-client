import { ITopic } from 'Types';
import { ActionType, getType } from 'typesafe-actions';
import {
  clearUploads,
  deleteTopic,
  fetchTopics,
  uploadFile,
  fetchUsers,
  authorizeUser,
  deleteUser,
} from './actions';
import { User } from '../auth/actions';

export type Upload = {
  uuid: string;
  file: File;
  disposition: string;
  message?: string;
};

export type State = Readonly<{
  uploads: ReadonlyArray<Upload>;
  topics: ITopic[];
  users: User[];
  loading: boolean;
  notification?: { message: string | null };
  error?: any;
}>;

type AdminAction = ActionType<typeof import('./actions')>;

const initialState: State = {
  uploads: [],
  topics: [],
  users: [],
  notification: { message: null },
  loading: false,
};

const handleStatusUpdate = (
  uuid: string,
  upload: Upload,
  disposition: string,
  message?: string,
) => (upload.uuid === uuid ? { ...upload, disposition, message } : upload);

const reducer = (state = initialState, action: AdminAction): State => {
  switch (action.type) {
    case getType(fetchTopics.request):
    case getType(fetchUsers.request):
    case getType(authorizeUser.request):
    case getType(deleteUser.request):
    case getType(deleteTopic.request):
      return { ...state, loading: true, error: null };

    case getType(fetchTopics.success):
    case getType(deleteTopic.success):
      return { ...state, topics: action.payload, loading: false };

    case getType(deleteUser.success):
      return { ...state, notification: action.payload, loading: false };

    case getType(authorizeUser.success):
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? action.payload : user,
        ),
        loading: false,
      };

    case getType(fetchUsers.success):
      return { ...state, users: action.payload, loading: false };

    case getType(deleteUser.failure):
    case getType(fetchUsers.failure):
    case getType(fetchTopics.failure):
    case getType(deleteTopic.failure):
      return { ...state, error: action.payload, loading: false };

    case getType(uploadFile.request):
      return {
        ...state,
        uploads: [
          ...state.uploads,
          { ...action.payload, disposition: 'pending' },
        ],
      };

    case getType(uploadFile.success): {
      const uploads = state.uploads.map(upload =>
        handleStatusUpdate(
          action.payload.uuid,
          upload,
          action.payload.disposition,
        ),
      );
      return { ...state, uploads };
    }

    case getType(uploadFile.failure): {
      const { error, uuid } = action.payload;
      const uploads = state.uploads.map(upload =>
        handleStatusUpdate(uuid, upload, 'error', error.response.data.message),
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
