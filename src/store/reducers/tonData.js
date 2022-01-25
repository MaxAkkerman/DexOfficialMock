import produce from "immer";

import {
  LP_TOKENS_FETCH_FAILED,
  LP_TOKENS_FETCH_LOADING,
  LP_TOKENS_FETCH_SUCCEEDED,
  PAIRS_FETCH_FAILED,
  PAIRS_FETCH_LOADING,
  PAIRS_FETCH_SUCCEEDED,
  RESET_LP_TOKENS,
  RESET_PAIRS,
  RESET_TOKENS,
  TOKENS_FETCH_FAILED,
  TOKENS_FETCH_LOADING,
  TOKENS_FETCH_SUCCEEDED,
} from "../actions/types";

const pairsInitialState = {
  pairs: [],
  pairsError: null,
  pairsFetched: false,
  pairsLoading: false,
};

const tokensInitialState = {
  tokens: [],
  tokensError: null,
  tokensFetched: false,
  tokensLoading: false,
};

const lpTokensInitialState = {
  lpTokens: [],
  lpTokensError: null,
  lpTokensFetched: false,
  lpTokensLoading: false,
};

const initialState = {
  ...pairsInitialState,
  ...tokensInitialState,
  ...lpTokensInitialState,
};

export default function tonData(state = initialState, { payload, type }) {
  switch (type) {
    case PAIRS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.pairs = payload;
        draft.pairsError = null;
        draft.pairsFetched = true;
        draft.pairsLoading = false;
      });
    case PAIRS_FETCH_LOADING:
      return produce(state, (draft) => {
        draft.pairsError = null;
        draft.pairsFetched = false;
        draft.pairsLoading = true;
      });
    case PAIRS_FETCH_FAILED:
      return produce(state, (draft) => {
        draft.pairsError = payload;
        draft.pairsFetched = true;
        draft.pairsLoading = false;
      });
    case RESET_PAIRS:
      return produce(state, (draft) => {
        draft.pairs = [];
        draft.pairsError = null;
        draft.pairsFetched = false;
        draft.pairsLoading = false;
      });
    case TOKENS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tokens = payload;
        draft.tokensError = null;
        draft.tokensFetched = true;
        draft.tokensLoading = false;
      });
    case TOKENS_FETCH_LOADING:
      return produce(state, (draft) => {
        draft.tokensError = null;
        draft.tokensFetched = false;
        draft.tokensLoading = true;
      });
    case TOKENS_FETCH_FAILED:
      return produce(state, (draft) => {
        draft.tokensError = payload;
        draft.tokensFetched = true;
        draft.tokensLoading = false;
      });
    case RESET_TOKENS:
      return produce(state, (draft) => {
        draft.tokens = [];
        draft.tokensError = null;
        draft.tokensFetched = false;
        draft.tokensLoading = false;
      });
    case LP_TOKENS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.lpTokens = payload;
        draft.lpTokensError = null;
        draft.lpTokensFetched = true;
        draft.lpTokensLoading = false;
      });
    case LP_TOKENS_FETCH_LOADING:
      return produce(state, (draft) => {
        draft.lpTokensError = null;
        draft.lpTokensFetched = false;
        draft.lpTokensLoading = true;
      });
    case LP_TOKENS_FETCH_FAILED:
      return produce(state, (draft) => {
        draft.lpTokensError = payload;
        draft.lpTokensFetched = true;
        draft.lpTokensLoading = false;
      });
    case RESET_LP_TOKENS:
      return produce(state, (draft) => {
        draft.lpTokens = [];
        draft.lpTokensError = null;
        draft.lpTokensFetched = false;
        draft.lpTokensLoading = false;
      });
    default:
      return state;
  }
}
