import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";

import getAllLpWallets from "../../utils/getAllLpWallets";
import {
  setLpTokensFetchFailedAction,
  setLpTokensFetchLoadingAction,
  setLpTokensFetchSucceededAction,
} from "../actions";
import { LP_TOKENS_FETCH_REQUESTED } from "../types";

function* fetchLpTokens() {
  yield put(setLpTokensFetchLoadingAction());

  try {
    const tokens: SagaReturnType<typeof getAllLpWallets> = yield call(
      getAllLpWallets,
    );
    yield put(setLpTokensFetchSucceededAction(tokens));
  } catch (e) {
    yield put(setLpTokensFetchFailedAction(e as string));
  }
}

export default function* fetchLpTokensSaga() {
  yield takeLatest(LP_TOKENS_FETCH_REQUESTED, fetchLpTokens);
}
