import { combineReducers } from 'redux';

import target from './reducers/target';
import purpose from './reducers/purpose';
import criterias from './reducers/criterias';
import alternatives from './reducers/alternatives';
import stage from './reducers/stage';
import menu from './reducers/menu';
import LPRs from './reducers/LPRs';

export default combineReducers({
  target,
  purpose,
  criterias,
  alternatives,
  LPRs,
  menu,
  stage
});
