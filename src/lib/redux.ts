import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "../store/reducers";
import rootSaga from "../store/sagas";
import connectWallet from "../utils/connectWallet";
import getAllLpWallets from "../utils/getAllLpWallets";
import getAllPairs from "../utils/getAllPairs";
import getAllTokenWallets from "../utils/getAllTokenWallets";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === "development",
  preloadedState: {
    chromePopup: {
      visible: localStorage.getItem("chrome") ? false : true,
    },
    tonContext: {
      functions: {
        connectWallet,
        getAllTokenWallets,
        getAllPairs,
        getAllLpWallets,
      },
    },
  },
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
