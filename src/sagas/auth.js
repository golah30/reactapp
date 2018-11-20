import { authRequest, authSuccess, authFailure } from '../ducks/Auth';
import { takeEvery, put, call } from 'redux-saga/effects';
import { loginQuery } from '../api';

function* authFlow(action) {
  try {
    let data;
    if (action.type === authRequest.toString()) {
      data = yield call(loginQuery, action.payload);
    }
    yield put(authSuccess(data.data));
  } catch (err) {
    yield put(authFailure(err.response.data.error));
  }
}

export function* fetchAuthWatch() {
  yield takeEvery([authRequest], authFlow);
}
