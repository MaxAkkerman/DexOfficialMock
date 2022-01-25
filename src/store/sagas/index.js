import { all } from "redux-saga/effects";

import fetchPairsSaga from "../sagas/fetchPairs";
import fetchTokensSaga from "../sagas/fetchTokens";
import fetchLpTokensSaga from "../sagas/fetchLpTokens";

export default function* rootSaga() {
  yield all([fetchPairsSaga(), fetchTokensSaga(), fetchLpTokensSaga()]);
}
