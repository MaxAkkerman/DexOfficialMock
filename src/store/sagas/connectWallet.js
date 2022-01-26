import { call, put, select, takeLatest } from "redux-saga/effects";

import {
  CONNECT_WALLET_REQUESTED,
  SET_CLIENT_DATA,
  SET_WALLET_IS_CONNECTED,
} from "../actions/types";

function* connectWallet() {
  const connectWallet = yield select(
    (state) => state.tonContext.functions.connectWallet,
  );
  const wallet = yield call(connectWallet);

  yield put({
    payload: wallet,
    type: SET_CLIENT_DATA,
  });
  yield put({
    payload: true,
    type: SET_WALLET_IS_CONNECTED,
  });
}

export default function* connectWalletSaga() {
  yield takeLatest(CONNECT_WALLET_REQUESTED, connectWallet);
}
