import reduce from "lodash/reduce";

import {
  INIT_TON_CONTEXT,
  RESET_TON_CONTEXT,
  UPDATE_TON_CONTEXT,
} from "../actions/types";

const initialState = {
  context: {
    dexClientAddress: null,
    dexRootAddress: null,
    limitRootAddress: null,
    reduxStore: null,
    tonClient: null,
  },
  functions: {
    cancelLimitOrder() {},
    getAllTokenWallets() {},
    getAllPairs() {},
    makeLimitOrder() {},
    swap() {},
    takeLimitOrder() {},
    transferLimitOrder() {},
    updateLimitOrderPrice() {},
  },
  helperFunctions: {
    checkClientPairExists() {},
    checkWalletExists() {},
    getClientKeys() {},
    getClientWallet() {},
    getPair() {},
    getPairsTotalSupply() {},
    getRootFromWallet() {},
    getShardLimit() {},
    getTokenRouterAddress() {},
    getWalletFromRoot() {},
  },
};

/**
 * In the end we are creating ton context for:
 * 	- "functions" - this.context and this.helperFunctions
 * 	- "helperFunctions" - this.context
 * 	- "context" in context property, which equals to this.context
 */

export default function tonContext(state = initialState, { payload, type }) {
  switch (type) {
    case INIT_TON_CONTEXT: {
      const helperFunctions = reduce(
        state.helperFunctions,
        (r, v, k) => {
          r[k] = v.bind({ context: state.context });
          return r;
        },
        {},
      );

      return {
        context: state.context,
        functions: reduce(
          state.functions,
          (r, v, k) => {
            r[k] = v.bind({
              context: state.context,
              helperFunctions,
            });
            return r;
          },
          {},
        ),
        helperFunctions,
        original: {
          // preserver original functions
          functions: state.functions,
          helperFunctions: state.helperFunctions,
        },
      };
    }
    case UPDATE_TON_CONTEXT: {
      const newValuesContext = {
        ...state.context,
        [payload.name]: payload.value,
      };
      const helperFunctions = reduce(
        state.original.helperFunctions,
        (r, v, k) => {
          r[k] = v.bind({ context: newValuesContext });
          return r;
        },
        {},
      );

      return {
        context: newValuesContext,
        functions: reduce(
          state.original.functions,
          (r, v, k) => {
            r[k] = v.bind({
              context: newValuesContext,
              helperFunctions,
            });
            return r;
          },
          {},
        ),
        helperFunctions,
        original: state.original, // preserve original functions
      };
    }
    case RESET_TON_CONTEXT: {
      const newValuesContext = { ...state.context, dexClientAddress: null };
      const helperFunctions = reduce(
        state.original.helperFunctions,
        (r, v, k) => {
          r[k] = v.bind({ context: newValuesContext });
          return r;
        },
        {},
      );

      return {
        context: newValuesContext,
        functions: reduce(
          state.original.functions,
          (r, v, k) => {
            r[k] = v.bind({
              context: newValuesContext,
              helperFunctions,
            });
            return r;
          },
          {},
        ),
        helperFunctions,
        original: state.original, // preserve original functions
      };
    }
    default:
      return state;
  }
}
