import { combineReducers } from 'redux';
import auth from '../features/auth/reducer';
import content from '../features/content/reducer';
import search from '../features/search/reducer';
import settings from '../features/settings/reducer';
import layout from '../layout/reducer';

const rootReducer = combineReducers({
  auth,
  content,
  layout,
  search,
  settings,
});

export default rootReducer;
