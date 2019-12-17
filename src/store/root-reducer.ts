import { combineReducers } from 'redux';
import auth from '../features/auth/reducer';
import content from '../features/content/reducer';
import flashcards from '../features/flashcards/reducer';
import search from '../features/search/reducer';
import settings from '../features/settings/reducer';
import layout from '../layout/reducer';
import admin from '../features/admin/reducer';

const rootReducer = combineReducers({
  admin,
  auth,
  content,
  flashcards,
  layout,
  search,
  settings,
});

export default rootReducer;
