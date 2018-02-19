import { combineReducers } from 'redux';
import errors from './errors/reducer';
import home from './home/reducer';

const rootReducer = combineReducers({
  errors,
  home,
});

export default rootReducer;
