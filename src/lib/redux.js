import isEmpty from "lodash/isEmpty";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { initTonContext, updateTonContext } from "../store/actions/ton";
import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";
import connectWallet from "../utils/connectWallet";
import getAllTokenWallets from "../utils/getAllTokenWallets";
import getAllPairs from "../utils/getAllPairs";
import getAllLpWallets from "../utils/getAllLpWallets";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = createStore(
  rootReducer,
  {
    chromePopup: {
      visible: localStorage.getItem("chrome") ? false : true,
    },
    tonContext: {
      context: {
        dexClientAddress:
          localStorage.getItem("clientData") &&
          JSON.parse(localStorage.getItem("clientData")).dexclient,
        dexRootAddress: "",
        limitRootAddress: "",
        tonClient: {},
      },
      functions: {
        connectWallet,
        getAllTokenWallets,
        getAllPairs,
        getAllLpWallets,
      },
    },
  },
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
reduxStore.dispatch(updateTonContext("reduxStore", reduxStore));
