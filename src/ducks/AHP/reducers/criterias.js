import { handleActions } from 'redux-actions';
import { setAhpCriterias } from '../actions';

export default handleActions(
  {
    [setAhpCriterias]: (state, action) => action.payload
  },
  []
);
