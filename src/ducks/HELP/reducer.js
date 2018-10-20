import { handleActions } from 'redux-actions';
import { helpRequest, helpSuccess, helpFailure } from './actions';

export default handleActions(
  {
    [helpRequest.toString()]: state => ({
      result: {},
      error: null,
      isFetching: true
    }),
    [helpSuccess.toString()]: (state, action) => ({
      isFetching: false,
      result: action.payload,
      error: null
    }),
    [helpFailure.toString()]: (state, action) => ({
      isFetching: false,
      error: action.payload,
      result: {}
    })
  },
  {
    isFetching: false,
    result: {},
    error: null
  }
);
