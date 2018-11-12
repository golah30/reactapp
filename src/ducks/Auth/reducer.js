import { handleActions } from 'redux-actions';
import {
  authRequest,
  authSuccess,
  authFailure,
  authLogoutRequest
} from './actions';

export default handleActions(
  {
    [authRequest]: state => ({
      Auth: false,
      token: '',
      isFetching: true,
      error: null
    }),
    [authLogoutRequest]: state => ({
      Auth: false,
      token: '',
      isFetching: false,
      error: null
    }),
    [authSuccess]: (state, action) => ({
      Auth: action.payload.auth,
      token: action.payload.token,
      isFetching: false,
      error: null
    }),
    [authFailure]: (state, action) => ({
      Auth: false,
      token: '',
      isFetching: false,
      error: action.payload
    })
  },
  {
    Auth: false,
    token: '',
    isFetching: false,
    error: null
  }
);
