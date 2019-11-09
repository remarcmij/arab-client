import { combineReducers } from 'redux';
import auth from './auth';
import content from './content';
import navbar from './navbar';
import search from './search';
import settings from './settings';
import toast from './toast';

const rootReducer = combineReducers({
  auth,
  content,
  navbar,
  search,
  settings,
  toast,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
