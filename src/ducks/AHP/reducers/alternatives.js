import { handleActions } from 'redux-actions';
import { setAhpAlternatives } from '../actions';

export default handleActions(
  {
    [setAhpAlternatives]: (state, action) => action.payload
  },
  []
);
