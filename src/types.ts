import { Store } from "redux";

export type FunctionsContext = {
  context: {
    reduxStore: Store<{
      context: {};
    }>;
  };
};

export interface AlertMessageProps {
  type: "success" | "info" | "error";
  message: string;
}
