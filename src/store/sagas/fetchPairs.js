import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  PAIRS_FETCH_FAILED,
  PAIRS_FETCH_LOADING,
  PAIRS_FETCH_REQUESTED,
  PAIRS_FETCH_SUCCEEDED,
} from "../actions/types";

function* fetchPairs() {
  yield put({ type: PAIRS_FETCH_LOADING });

  try {
    const getAllPairs = yield select(
      (state) => state.tonContext.functions.getAllPairs,
    );
    const pairs = yield call(getAllPairs);
    yield put({
      payload: pairs,
      type: PAIRS_FETCH_SUCCEEDED,
    });
  } catch (e) {
    yield put({
      payload: e.message,
      type: PAIRS_FETCH_FAILED,
    });
  }
}

export default function* fetchPairsSaga() {
  yield takeLatest(PAIRS_FETCH_REQUESTED, fetchPairs);
}
