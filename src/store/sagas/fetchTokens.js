import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  TOKENS_FETCH_FAILED,
  TOKENS_FETCH_LOADING,
  TOKENS_FETCH_REQUESTED,
  TOKENS_FETCH_SUCCEEDED,
} from "../actions/types";

function* fetchTokens() {
  yield put({
    type: TOKENS_FETCH_LOADING,
  });

  try {
    const getAllTokenWallets = yield select(
      (state) => state.tonContext.functions.getAllTokenWallets,
    );
    const tokens = yield call(getAllTokenWallets);

    yield put({
      payload: tokens,
      type: TOKENS_FETCH_SUCCEEDED,
    });
  } catch (e) {
    yield put({
      payload: e.message,
      type: TOKENS_FETCH_FAILED,
    });
  }
}

export default function* fetchTokensSaga() {
  yield takeLatest(TOKENS_FETCH_REQUESTED, fetchTokens);
}
