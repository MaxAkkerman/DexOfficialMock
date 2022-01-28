import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";

import getAllPairs from "../../utils/getAllPairs";
import {
  setPairsFetchFailedAction,
  setPairsFetchLoadingAction,
  setPairsFetchSucceededAction,
} from "../actions";
import { PAIRS_FETCH_REQUESTED } from "../types";

function* fetchPairs() {
  yield put(setPairsFetchLoadingAction());

  try {
    const pairs: SagaReturnType<typeof getAllPairs> = yield call(getAllPairs);
    yield put(setPairsFetchSucceededAction(pairs));
  } catch (e) {
    yield put(setPairsFetchFailedAction(e as string));
  }
}

export default function* fetchPairsSaga() {
  yield takeLatest(PAIRS_FETCH_REQUESTED, fetchPairs);
}
