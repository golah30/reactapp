import { handleActions } from 'redux-actions';
import { setAhpTarget } from '../actions';

export default handleActions(
  { [setAhpTarget]: (state, action) => action.payload },
  ''
);
