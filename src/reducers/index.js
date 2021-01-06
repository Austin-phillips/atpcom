import { combineReducers } from 'redux';
import user from './user';
import company from './company';

const rootReducer = combineReducers({
  user,
  company
});

export default rootReducer;