import { call, put, SagaReturnType, takeLatest } from "redux-saga/effects";

import connectWalletFn from "../../utils/connectWallet";
import {
  setConnectWalletProcessingAction,
  setConnectWalletSucceededAction,
  setCreatePairFailedAction,
} from "../actions";
import { CONNECT_WALLET } from "../types";

function* connectWallet() {
  yield put(setConnectWalletProcessingAction());
  try {
    const wallet: SagaReturnType<typeof connectWalletFn> = yield call(
      connectWalletFn,
    );
    console.log("wallet",wallet)
    yield put(setConnectWalletSucceededAction(wallet));
  } catch (e) {
    yield put(setCreatePairFailedAction(e as string));
  }
}

export default function* connectWalletSaga() {
  yield takeLatest(CONNECT_WALLET, connectWallet);
}
