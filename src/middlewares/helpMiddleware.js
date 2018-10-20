import { helpRequest, helpSuccess, helpFailure } from '../ducks/HELP';

import axios from 'axios';

export default store => next => action => {
  if (action.type === helpRequest.toString()) {
    axios(action.payload)
      .then(answer => {
        store.dispatch(helpSuccess(answer));
      })
      .catch(err => {
        store.dispatch(helpFailure(err));
      });
  }

  return next(action);
};
