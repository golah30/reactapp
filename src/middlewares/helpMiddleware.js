import {
  helpCategoriesRequest,
  helpCategoriesSuccess,
  helpCategoriesFailure,
  helpPostsRequest,
  helpPostsSuccess,
  helpPostsFailure
} from '../ducks/HELP';

import axios from 'axios';

export default store => next => action => {
  if (action.type === helpCategoriesRequest.toString()) {
    axios(action.payload)
      .then(answer => {
        store.dispatch(helpCategoriesSuccess(answer));
      })
      .catch(err => {
        store.dispatch(helpCategoriesFailure(err));
      });
  }
  if (action.type === helpPostsRequest.toString()) {
    axios(action.payload)
      .then(answer => {
        store.dispatch(helpPostsSuccess(answer));
      })
      .catch(err => {
        store.dispatch(helpPostsFailure(err));
      });
  }

  return next(action);
};
