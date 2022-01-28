import produce from "immer";

import {
  ActionError,
  LimitOrderValuesConfirm,
  LpToken,
  Pair,
  ProvideLiquidityValuesConfirm,
  ReduxAction,
  RemoveLiquidityValuesConfirm,
  SetClientDataArg,
  SwapValuesConfirm,
  ThemeVariant,
  Token,
  WaitingPopupValues,
} from "../types";
import {
  ADD_LIQUIDITY_FAILED,
  ADD_LIQUIDITY_SUCCEEDED,
  ADDING_LIQUIDITY,
  CHANGE_THEME,
  CONNECT_WALLET_FAILED,
  CONNECT_WALLET_SUCCEEDED,
  CONNECTING_WALLET,
  CREATE_PAIR_FAILED,
  CREATE_PAIR_SUCCEEDED,
  CREATING_PAIR,
  DISCONNECT_WALLET,
  LP_TOKENS_FETCH_FAILED,
  LP_TOKENS_FETCH_LOADING,
  LP_TOKENS_FETCH_SUCCEEDED,
  MAKE_LIMIT_ORDER_FAILED,
  MAKE_LIMIT_ORDER_SUCCEEDED,
  MAKING_LIMIT_ORDER,
  PAIRS_FETCH_FAILED,
  PAIRS_FETCH_LOADING,
  PAIRS_FETCH_SUCCEEDED,
  REMOVE_LIQUIDITY_FAILED,
  REMOVE_LIQUIDITY_SUCCEEDED,
  REMOVING_LIQUIDITY,
  RESET_MAKE_LIMIT_ORDER_CONFIRM_VALUES,
  RESET_PROVIDE_LIQUIDITY_CONFIRM_VALUES,
  RESET_REMOVE_LIQUIDITY_CONFIRM_VALUES,
  RESET_SWAP_CONFIRM_VALUES,
  RESET_WAITING_VALUES,
  SET_MAKE_LIMIT_ORDER_CONFIRM_VALUES,
  SET_PROVIDE_LIQUIDITY_CONFIRM_VALUES,
  SET_REMOVE_LIQUIDITY_CONFIRM_VALUES,
  SET_SWAP_CONFIRM_VALUES,
  SET_WAITING_VALUES,
  SWAP_FAILED,
  SWAP_HAPPENING,
  SWAP_SUCCEEDED,
  TOKENS_FETCH_FAILED,
  TOKENS_FETCH_LOADING,
  TOKENS_FETCH_SUCCEEDED,
} from "./types";

const tips: string[] = [];

const appTheme: ThemeVariant = "light" as ThemeVariant;

const pairsInitialState = {
  pairs: [] as Pair[],
  pairsError: null as ActionError | null,
  pairsFetched: false,
  pairsLoading: false,
};

const tokensInitialState = {
  tokens: [] as Token[],
  tokensError: null as ActionError | null,
  tokensFetched: false,
  tokensLoading: false,
};

const lpTokensInitialState = {
  lpTokens: [] as LpToken[],
  lpTokensError: null as ActionError | null,
  lpTokensFetched: false,
  lpTokensLoading: false,
};

const clientInitialState = {
  client: null as SetClientDataArg | null,
  clientError: null as ActionError | null,
  clientFetched: false,
  clientLoading: false,
};

const popups = {
  swapConfirmValues: null as SwapValuesConfirm | null,
  makeLimitOrderConfirmValues: null as LimitOrderValuesConfirm | null,
  provideLiquidityConfirmValues: null as ProvideLiquidityValuesConfirm | null,
  removeLiquidityConfirmValues: null as RemoveLiquidityValuesConfirm | null,
  waitingPopupValues: null as WaitingPopupValues | null,
};

const initialState = {
  tips,
  appTheme,
  ...pairsInitialState,
  ...tokensInitialState,
  ...lpTokensInitialState,
  ...clientInitialState,
  ...popups,
};

export default function reducer(state = initialState, action: ReduxAction) {
  switch (action.type) {
    case SWAP_HAPPENING:
      return produce(state, (draft) => {
        draft.tips.push(SWAP_HAPPENING);
      });
    case SWAP_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tips.push(SWAP_SUCCEEDED);
      });
    case SWAP_FAILED:
      return produce(state, (draft) => {
        draft.tips.push(SWAP_FAILED);
      });
    case ADDING_LIQUIDITY:
      return produce(state, (draft) => {
        draft.tips.push(ADDING_LIQUIDITY);
      });
    case ADD_LIQUIDITY_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tips.push(ADD_LIQUIDITY_SUCCEEDED);
      });
    case ADD_LIQUIDITY_FAILED:
      return produce(state, (draft) => {
        draft.tips.push(ADD_LIQUIDITY_FAILED);
      });
    case REMOVING_LIQUIDITY:
      return produce(state, (draft) => {
        draft.tips.push(REMOVING_LIQUIDITY);
      });
    case REMOVE_LIQUIDITY_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tips.push(REMOVE_LIQUIDITY_SUCCEEDED);
      });
    case REMOVE_LIQUIDITY_FAILED:
      return produce(state, (draft) => {
        draft.tips.push(REMOVE_LIQUIDITY_FAILED);
      });
    case CREATING_PAIR:
      return produce(state, (draft) => {
        draft.tips.push(CREATING_PAIR);
      });
    case CREATE_PAIR_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tips.push(CREATE_PAIR_SUCCEEDED);
      });
    case CREATE_PAIR_FAILED:
      return produce(state, (draft) => {
        draft.tips.push(CREATE_PAIR_FAILED);
      });
    case MAKING_LIMIT_ORDER:
      return produce(state, (draft) => {
        draft.tips.push(MAKING_LIMIT_ORDER);
      });
    case MAKE_LIMIT_ORDER_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tips.push(MAKE_LIMIT_ORDER_SUCCEEDED);
      });
    case MAKE_LIMIT_ORDER_FAILED:
      return produce(state, (draft) => {
        draft.tips.push(MAKE_LIMIT_ORDER_FAILED);
      });
    case CONNECTING_WALLET:
      return produce(state, (draft) => {
        draft.clientError = null;
        draft.clientFetched = false;
        draft.clientLoading = true;
        draft.tips.push(CONNECTING_WALLET);
      });
    case CONNECT_WALLET_SUCCEEDED:
      return produce(state, (draft) => {
        draft.client = action.payload;
        draft.clientError = null;
        draft.clientFetched = true;
        draft.clientLoading = false;
        draft.tips.push(CONNECT_WALLET_SUCCEEDED);
      });
    case CONNECT_WALLET_FAILED:
      return produce(state, (draft) => {
        draft.clientError = action.payload;
        draft.clientFetched = true;
        draft.clientLoading = false;
        draft.tips.push(CONNECT_WALLET_FAILED);
      });
    case DISCONNECT_WALLET:
      return produce(state, (draft) => {
        draft.client = null;
        draft.clientError = null;
        draft.clientFetched = false;
        draft.clientLoading = false;
        draft.tips.push(DISCONNECT_WALLET);
      });
    case PAIRS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.pairs = action.payload;
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
        draft.pairsError = action.payload;
        draft.pairsFetched = true;
        draft.pairsLoading = false;
      });
    case TOKENS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.tokens = action.payload;
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
        draft.tokensError = action.payload;
        draft.tokensFetched = true;
        draft.tokensLoading = false;
      });
    case LP_TOKENS_FETCH_SUCCEEDED:
      return produce(state, (draft) => {
        draft.lpTokens = action.payload;
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
        draft.lpTokensError = action.payload;
        draft.lpTokensFetched = true;
        draft.lpTokensLoading = false;
      });
    case SET_SWAP_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.swapConfirmValues = action.payload;
      });
    case RESET_SWAP_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.swapConfirmValues = null;
      });
    case SET_MAKE_LIMIT_ORDER_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.makeLimitOrderConfirmValues = action.payload;
      });
    case RESET_MAKE_LIMIT_ORDER_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.makeLimitOrderConfirmValues = null;
      });
    case SET_PROVIDE_LIQUIDITY_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.provideLiquidityConfirmValues = action.payload;
      });
    case RESET_PROVIDE_LIQUIDITY_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.provideLiquidityConfirmValues = null;
      });
    case SET_REMOVE_LIQUIDITY_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.removeLiquidityConfirmValues = action.payload;
      });
    case RESET_REMOVE_LIQUIDITY_CONFIRM_VALUES:
      return produce(state, (draft) => {
        draft.removeLiquidityConfirmValues = null;
      });
    case SET_WAITING_VALUES:
      return produce(state, (draft) => {
        draft.waitingPopupValues = action.payload;
      });
    case RESET_WAITING_VALUES:
      return produce(state, (draft) => {
        draft.waitingPopupValues = null;
      });
    case CHANGE_THEME:
      return produce(state, (draft) => {
        draft.appTheme = action.payload as ThemeVariant;
      });
    default:
      return state;
  }
}
