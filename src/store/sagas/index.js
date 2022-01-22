import { all } from 'redux-saga/effects';

import fetchPairsSaga from '../sagas/fetchPairs';
import fetchTokensSaga from '../sagas/fetchTokens';

export default function* rootSaga() {
  yield all([fetchPairsSaga(), fetchTokensSaga()]);
}
