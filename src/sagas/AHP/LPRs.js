import { ahpLprRequest, ahpLprSuccess, ahpLprFailure } from '../../ducks/AHP';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { getLocalPriorities } from '../../api';
import _ from 'lodash';

const getLPRs = state => state.AHP.LPRs.data;

const editData = (currentLPRs, response, payload) => {
  const { id, table, radio, comment } = payload;
  const resData = response.data;
  let LPRs = _.cloneDeep(currentLPRs);
  const lpr = resData.localPriorities;
  const indicators = [resData.dim, resData.lam, resData.ci, resData.cr];

  if (
    !_.isEqual(LPRs[id].table, table) ||
    !_.isEqual(LPRs[id].comment, comment)
  ) {
    LPRs[id] = {
      table,
      lpr,
      indicators,
      radio,
      comment
    };
  }
  return LPRs;
};

function* ahpLocalPrioritiesFlow(action) {
  try {
    let response;
    if (action.type === ahpLprRequest.toString()) {
      response = yield call(getLocalPriorities, action.payload.table);
    }
    let data = yield select(getLPRs);

    yield put(ahpLprSuccess(editData(data, response, action.payload)));
  } catch (err) {
    yield put(ahpLprFailure(err));
  }
}

export function* fetchAhpLocalPrioritiesWatch() {
  yield takeEvery([ahpLprRequest], ahpLocalPrioritiesFlow);
}
