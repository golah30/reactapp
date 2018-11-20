import { handleActions } from 'redux-actions';
import { ahpLprRequest, ahpLprSuccess, ahpLprFailure } from '../actions';

export default handleActions(
  {
    [ahpLprRequest]: (state, action) => ({
      ...state,
      isFetching: true,
      error: null
    }),
    [ahpLprSuccess]: (state, action) => ({
      data: action.payload,
      isFetching: false,
      error: null
    }),
    [ahpLprFailure]: (state, action) => ({
      data: state.data,
      isFetching: false,
      error: action.payload
    })
  },
  {
    isFetching: false,
    data: [],
    error: null
  }
);
