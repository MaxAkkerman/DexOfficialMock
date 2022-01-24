import { Store } from "redux";

export type FunctionsContext = {
  context: {
    reduxStore: Store<{
      context: {};
    }>;
  };
};
