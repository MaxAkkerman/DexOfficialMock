import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "../store/reducer";
import rootSaga from "../store/sagas";

const sagaMiddleware = createSagaMiddleware();

export const reduxStore = configureStore({
  reducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV === "development",
});

sagaMiddleware.run(rootSaga);
