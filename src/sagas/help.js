import {
  helpCategoriesRequest,
  helpCategoriesSuccess,
  helpCategoriesFailure,
  helpPostsRequest,
  helpPostsSuccess,
  helpPostsFailure
} from '../ducks/HELP';

import { takeEvery, put, call } from 'redux-saga/effects';
import { getQuery } from '../api';

function* helpCategoriesFlow(action) {
  try {
    let data;
    if (action.type === helpCategoriesRequest.toString()) {
      data = yield call(getQuery, action.payload);
    }
    yield put(helpCategoriesSuccess(data));
  } catch (err) {
    yield put(helpCategoriesFailure(err));
  }
}

function* helpPostsFlow(action) {
  try {
    let data;
    if (action.type === helpPostsRequest.toString()) {
      data = yield call(getQuery, action.payload);
    }
    yield put(helpPostsSuccess(data));
  } catch (err) {
    yield put(helpPostsFailure(err));
  }
}

export function* fetchCategoriesWatch() {
  yield takeEvery([helpCategoriesRequest], helpCategoriesFlow);
}

export function* fetchPostsWatch() {
  yield takeEvery([helpPostsRequest], helpPostsFlow);
}
