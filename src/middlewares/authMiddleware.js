import { authRequest, authSuccess, authFailure } from '../ducks/Auth';

import axios from 'axios';
import { LOG_IN } from '../api';

export default store => next => action => {
  if (action.type === authRequest.toString()) {
    axios
      .post(LOG_IN, action.payload)
      .then(answer => {
        store.dispatch(authSuccess(answer.data));
      })
      .catch(err => {
        store.dispatch(authFailure(err.response.data.error));
      });
  }
  return next(action);
};
