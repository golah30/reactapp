import { combineReducers } from 'redux';
import AHP from './AHP';
import WSM from './WSM';
import HELP from './HELP';
import Auth from './Auth';

export default combineReducers({
  AHP,
  WSM,
  HELP,
  Auth
});
