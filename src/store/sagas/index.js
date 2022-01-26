import { all } from "redux-saga/effects";

import connectWalletSaga from "./connectWallet";
import fetchLpTokensSaga from "./fetchLpTokens";
import fetchPairsSaga from "./fetchPairs";
import fetchTokensSaga from "./fetchTokens";

export default function* rootSaga() {
  yield all([
    fetchPairsSaga(),
    fetchTokensSaga(),
    fetchLpTokensSaga(),
    connectWalletSaga(),
  ]);
}
