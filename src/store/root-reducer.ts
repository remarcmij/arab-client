import { combineReducers } from 'redux';
import { settingsReducer } from '../features/settings';
import { publicationListReducer } from '../features/publications';
import { articleListReducer } from '../features/articles';
import { articleReducer } from '../features/article';

const rootReducer = combineReducers({
  settings: settingsReducer,
  publications: publicationListReducer,
  articles: articleListReducer,
  article: articleReducer,
});

export default rootReducer;
