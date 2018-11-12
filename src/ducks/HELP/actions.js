import { createActions } from 'redux-actions';

const {
  helpCategoriesRequest,
  helpCategoriesSuccess,
  helpCategoriesFailure,
  helpPostsRequest,
  helpPostsSuccess,
  helpPostsFailure
} = createActions(
  'HELP_CATEGORIES_REQUEST',
  'HELP_CATEGORIES_SUCCESS',
  'HELP_CATEGORIES_FAILURE',
  'HELP_POSTS_REQUEST',
  'HELP_POSTS_SUCCESS',
  'HELP_POSTS_FAILURE'
);

export {
  helpCategoriesRequest,
  helpCategoriesSuccess,
  helpCategoriesFailure,
  helpPostsRequest,
  helpPostsSuccess,
  helpPostsFailure
};
