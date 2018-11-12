import { handleActions } from 'redux-actions';
import {
  helpCategoriesRequest,
  helpCategoriesSuccess,
  helpCategoriesFailure,
  helpPostsRequest,
  helpPostsSuccess,
  helpPostsFailure
} from './actions';

export default handleActions(
  {
    [helpCategoriesRequest.toString()]: state => ({
      ...state,
      isCategoryFetching: true,
      categoryError: null,
      categoriesResult: {}
    }),
    [helpCategoriesSuccess.toString()]: (state, action) => ({
      ...state,
      isCategoryFetching: false,
      categoryError: null,
      categoriesResult: action.payload
    }),
    [helpCategoriesFailure.toString()]: (state, action) => ({
      ...state,
      isCategoryFetching: false,
      categoryError: action.payload,
      categoriesResult: {}
    }),
    [helpPostsRequest.toString()]: state => ({
      ...state,
      isPostsFetching: true,
      postsError: null,
      postsResult: {}
    }),
    [helpPostsSuccess.toString()]: (state, action) => ({
      ...state,
      isPostsFetching: false,
      postsError: null,
      postsResult: action.payload
    }),
    [helpPostsFailure.toString()]: (state, action) => ({
      ...state,
      isPostsFetching: false,
      postsError: action.payload,
      postsResult: {}
    })
  },
  {
    isCategoryFetching: false,
    isPostsFetching: false,
    categoryError: null,
    postsError: null,
    categoriesResult: {},
    postsResult: {}
  }
);
