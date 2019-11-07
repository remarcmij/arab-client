import { combineReducers } from 'redux';
import alert from './alert';
import toast from './toast';
import auth from './auth';
import content from './content';
import navbar from './navbar';
import search from './search';
import settings from './settings';

const rootReducer = combineReducers({
  alert,
  toast,
  auth,
  navbar,
  content,
  search,
  settings,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
