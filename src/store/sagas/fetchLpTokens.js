import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  LP_TOKENS_FETCH_FAILED,
  LP_TOKENS_FETCH_LOADING,
  LP_TOKENS_FETCH_REQUESTED,
  LP_TOKENS_FETCH_SUCCEEDED,
} from "../actions/types";

function* fetchLpTokens() {
  yield put({
    type: LP_TOKENS_FETCH_LOADING,
  });

  try {
    const getAllLpWallets = yield select(
      (state) => state.tonContext.functions.getAllLpWallets,
    );
    const tokens = yield call(getAllLpWallets);

    yield put({
      payload: tokens,
      type: LP_TOKENS_FETCH_SUCCEEDED,
    });
  } catch (e) {
    yield put({
      payload: e.message,
      type: LP_TOKENS_FETCH_FAILED,
    });
  }
}

export default function* fetchLpTokensSaga() {
  yield takeLatest(LP_TOKENS_FETCH_REQUESTED, fetchLpTokens);
}
