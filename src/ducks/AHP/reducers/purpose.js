import { handleActions } from 'redux-actions';
import { setAhpPurpose } from '../actions';

export default handleActions(
  {
    [setAhpPurpose]: (state, action) => ({
      target: action.payload.target,
      comment: action.payload.comment
    })
  },
  { target: '', comment: '' }
);
