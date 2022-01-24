import isEmpty from "lodash/isEmpty";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { initTonContext, updateTonContext } from "../store/actions/ton";
import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";
import connectWallet from "../utils/connectWallet";
import getAllClientWallets from "../utils/getAllClientWallets";
import getAllPairsWithoutProvider from "../utils/getAllPairsWithoutProvider";

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
        getAllClientWallets,
        getAllPairsWithoutProvider,
      },
    },
    tutorialReducer: {
      finished:
        localStorage.getItem("tutorialFinished") === null
          ? isEmpty(JSON.parse(localStorage.getItem("clientData"))) &&
            isEmpty(JSON.parse(localStorage.getItem("esp")))
            ? false
            : true
          : localStorage.getItem("tutorialFinished"),
    },
  },
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
reduxStore.dispatch(initTonContext());
reduxStore.dispatch(updateTonContext("reduxStore", reduxStore));
