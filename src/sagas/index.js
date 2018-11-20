import { fork } from 'redux-saga/effects';

import { fetchCategoriesWatch, fetchPostsWatch } from './help';
import { fetchAuthWatch } from './auth';
import { fetchAhpLocalPrioritiesWatch } from './AHP/LPRs';

export default function*() {
  yield fork(fetchCategoriesWatch);
  yield fork(fetchPostsWatch);
  yield fork(fetchAuthWatch);
  yield fork(fetchAhpLocalPrioritiesWatch);
}
