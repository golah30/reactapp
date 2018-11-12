import { createActions } from 'redux-actions';

const {
  authRequest,
  authSuccess,
  authFailure,
  authLogoutRequest
} = createActions(
  'AUTH_REQUEST',
  'AUTH_SUCCESS',
  'AUTH_FAILURE',
  'AUTH_LOGIN_REQUEST',
  'AUTH_LOGOUT_REQUEST'
);

export { authRequest, authSuccess, authFailure, authLogoutRequest };
