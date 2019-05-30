import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import navbar from './navbar';
import content from './content';
import search from './search';

const rootReducer = combineReducers({ alert, auth, navbar, content, search });

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
