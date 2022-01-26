import reduce from "lodash/reduce";

import {
  INIT_TON_CONTEXT,
  RESET_TON_CONTEXT,
  UPDATE_TON_CONTEXT,
} from "../actions/types";

const initialState = {
  functions: {
    connectWallet() {},
    getAllTokenWallets() {},
    getAllPairs() {},
    getAllLpWallets() {},
  },
};

/**
 * In the end we are creating ton context for:
 * 	- "functions" - this.context and this.helperFunctions
 * 	- "helperFunctions" - this.context
 * 	- "context" in context property, which equals to this.context
 */

export default function tonContext(state = initialState, { payload, type }) {
  return state;
}
