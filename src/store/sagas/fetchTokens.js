import { call, put, select, takeLatest } from 'redux-saga/effects';

import {
  TOKENS_FETCH_FAILED,
  TOKENS_FETCH_LOADING,
  TOKENS_FETCH_REQUESTED,
  TOKENS_FETCH_SUCCEEDED,
} from '../actions/types';

function* fetchTokens() {
  yield put({
    type: TOKENS_FETCH_LOADING,
  });

  try {
    const getAllClientWallets = yield select(
      (state) => state.tonContext.functions.getAllClientWallets,
    );
    const tokens = yield call(getAllClientWallets);

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
