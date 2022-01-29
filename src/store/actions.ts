import {
  ActionError,
  AddLiquidityArg,
  CreatePairArg,
  LimitOrderValuesConfirm,
  LpToken,
  MakeLimitOrderArg,
  MakeSwapArg,
  Pair,
  ProvideLiquidityValuesConfirm,
  RemoveLiquidityArg,
  RemoveLiquidityValuesConfirm,
  SetClientDataArg,
  SwapValuesConfirm,
  ThemeVariant,
  Token,
  WaitingPopupValues,
} from "../types";
import {
  ADD_LIQUIDITY,
  ADD_LIQUIDITY_FAILED,
  ADD_LIQUIDITY_SUCCEEDED,
  ADDING_LIQUIDITY,
  CHANGE_THEME,
  CONNECT_WALLET,
  CONNECT_WALLET_FAILED,
  CONNECT_WALLET_SUCCEEDED,
  CONNECTING_WALLET,
  CREATE_PAIR,
  CREATE_PAIR_FAILED,
  CREATE_PAIR_SUCCEEDED,
  CREATING_PAIR,
  DISCONNECT_WALLET,
  LP_TOKENS_FETCH_FAILED,
  LP_TOKENS_FETCH_LOADING,
  LP_TOKENS_FETCH_REQUESTED,
  LP_TOKENS_FETCH_SUCCEEDED,
  MAKE_LIMIT_ORDER,
  MAKE_LIMIT_ORDER_FAILED,
  MAKE_LIMIT_ORDER_SUCCEEDED,
  MAKE_SWAP,
  MAKING_LIMIT_ORDER,
  PAIRS_FETCH_FAILED,
  PAIRS_FETCH_LOADING,
  PAIRS_FETCH_REQUESTED,
  PAIRS_FETCH_SUCCEEDED,
  REMOVE_LIQUIDITY,
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
  TOKENS_FETCH_REQUESTED,
  TOKENS_FETCH_SUCCEEDED,
  UPDATE_SWAP_WALLETS,
} from "./types";

// Swap

export function makeSwapAction(arg: MakeSwapArg) {
  return {
    type: MAKE_SWAP,
    payload: arg,
  };
}

export function setSwapProcessingAction() {
  return {
    type: SWAP_HAPPENING,
  };
}

export function setSwapSucceededAction() {
  return {
    type: SWAP_SUCCEEDED,
  };
}

export function setSwapFailedAction(e: ActionError) {
  return {
    type: SWAP_FAILED,
    payload: e,
  };
}

export function updateSwapWalletsAction(tokens: Token[]) {
  return {
    type: UPDATE_SWAP_WALLETS,
    payload: tokens,
  };
}

// Add liquidity

export function addLiquidityAction(arg: AddLiquidityArg) {
  return {
    type: ADD_LIQUIDITY,
    payload: arg,
  };
}

export function setAddLiquidityProcessingAction() {
  return {
    type: ADDING_LIQUIDITY,
  };
}

export function setAddLiquiditySucceededAction() {
  return {
    type: ADD_LIQUIDITY_SUCCEEDED,
  };
}

export function setAddLiquidityFailedAction(e: ActionError) {
  return {
    type: ADD_LIQUIDITY_FAILED,
    payload: e,
  };
}

// Remove liquidity

export function removeLiquidityAction(arg: RemoveLiquidityArg) {
  return {
    type: REMOVE_LIQUIDITY,
    payload: arg,
  };
}

export function setRemoveLiquidityProcessingAction() {
  return {
    type: REMOVING_LIQUIDITY,
  };
}

export function setRemoveLiquiditySucceededAction() {
  return {
    type: REMOVE_LIQUIDITY_SUCCEEDED,
  };
}

export function setRemoveLiquidityFailedAction() {
  return {
    type: REMOVE_LIQUIDITY_FAILED,
  };
}

// Create pair

export function createPairAction(arg: CreatePairArg) {
  return {
    type: CREATE_PAIR,
    payload: arg,
  };
}

export function setCreatePairProcessingAction() {
  return {
    type: CREATING_PAIR,
  };
}

export function setCreatePairSucceededAction() {
  return {
    type: CREATE_PAIR_SUCCEEDED,
  };
}

export function setCreatePairFailedAction(e: ActionError) {
  return {
    type: CREATE_PAIR_FAILED,
    payload: e,
  };
}

// Make limit order

export function makeLimitOrderAction(arg: MakeLimitOrderArg) {
  return {
    type: MAKE_LIMIT_ORDER,
    payload: arg,
  };
}

export function setMakeLimitOrderProcessingAction() {
  return {
    type: MAKING_LIMIT_ORDER,
  };
}

export function setMakeLimitOrderSucceededAction() {
  return {
    type: MAKE_LIMIT_ORDER_SUCCEEDED,
  };
}

export function setMakeLimitOrderFailedAction(e: ActionError) {
  return {
    type: MAKE_LIMIT_ORDER_FAILED,
    payload: e,
  };
}

// Connect wallet

export function connectWalletAction() {
  return {
    type: CONNECT_WALLET,
  };
}

export function disconnectWalletAction() {
  return {
    type: DISCONNECT_WALLET,
  };
}

export function setConnectWalletProcessingAction() {
  return {
    type: CONNECTING_WALLET,
  };
}

export function setConnectWalletSucceededAction(arg: SetClientDataArg) {
  return {
    type: CONNECT_WALLET_SUCCEEDED,
    payload: arg,
  };
}

export function setConnectWalletFailedAction(e: ActionError) {
  return {
    type: CONNECT_WALLET_FAILED,
    payload: e,
  };
}

// Tokens

export function requestTokensFetchAction() {
  return {
    type: TOKENS_FETCH_REQUESTED,
  };
}

export function setTokensFetchLoadingAction() {
  return {
    type: TOKENS_FETCH_LOADING,
  };
}

export function setTokensFetchSucceededAction(tokens: Token[]) {
  return {
    type: TOKENS_FETCH_SUCCEEDED,
    payload: tokens,
  };
}

export function setTokensFetchFailedAction(e: ActionError) {
  return {
    type: TOKENS_FETCH_FAILED,
    payload: e,
  };
}

// Pairs

export function requestPairsFetchAction() {
  return {
    type: PAIRS_FETCH_REQUESTED,
  };
}

export function setPairsFetchLoadingAction() {
  return {
    type: PAIRS_FETCH_LOADING,
  };
}

export function setPairsFetchSucceededAction(pairs: Pair[]) {
  return {
    type: PAIRS_FETCH_SUCCEEDED,
    payload: pairs,
  };
}

export function setPairsFetchFailedAction(e: ActionError) {
  return {
    type: PAIRS_FETCH_FAILED,
    payload: e,
  };
}

// Lp tokens

export function requestLpTokensFetchAction() {
  return {
    type: LP_TOKENS_FETCH_REQUESTED,
  };
}

export function setLpTokensFetchLoadingAction() {
  return {
    type: LP_TOKENS_FETCH_LOADING,
  };
}

export function setLpTokensFetchSucceededAction(tokens: LpToken[]) {
  return {
    type: LP_TOKENS_FETCH_SUCCEEDED,
    payload: tokens,
  };
}

export function setLpTokensFetchFailedAction(e: ActionError) {
  return {
    type: LP_TOKENS_FETCH_FAILED,
    payload: e,
  };
}

// Swap confirm

export function setSwapConfirmValues(arg: SwapValuesConfirm) {
  return {
    type: SET_SWAP_CONFIRM_VALUES,
    payload: arg,
  };
}

export function resetSwapConfirmValues() {
  return {
    type: RESET_SWAP_CONFIRM_VALUES,
  };
}

// Make limit order confirm

export function setMakeLimitOrderConfirmValues(arg: LimitOrderValuesConfirm) {
  return {
    type: SET_MAKE_LIMIT_ORDER_CONFIRM_VALUES,
    payload: arg,
  };
}

export function resetMakeLimitOrderConfirmValues() {
  return {
    type: RESET_MAKE_LIMIT_ORDER_CONFIRM_VALUES,
  };
}

// Provide liquidity confirm
export function setProvideLiquidityConfirmValues(
  arg: ProvideLiquidityValuesConfirm,
) {
  return {
    type: SET_PROVIDE_LIQUIDITY_CONFIRM_VALUES,
    payload: arg,
  };
}

export function resetProvideLiquidityConfirmValues() {
  return {
    type: RESET_PROVIDE_LIQUIDITY_CONFIRM_VALUES,
  };
}

// Remove liquidity confirm

export function setRemoveLiquidityConfirmValues(
  arg: RemoveLiquidityValuesConfirm,
) {
  return {
    type: SET_REMOVE_LIQUIDITY_CONFIRM_VALUES,
    payload: arg,
  };
}

export function resetRemoveLiquidityConfirmValues() {
  return {
    type: RESET_REMOVE_LIQUIDITY_CONFIRM_VALUES,
  };
}

// Waiting popup

export function setWaitingPopupValues(arg: WaitingPopupValues) {
  return {
    type: SET_WAITING_VALUES,
    payload: arg,
  };
}

export function resetWaitingPopupValues() {
  return {
    type: RESET_WAITING_VALUES,
  };
}

export function changeThemeAction(variant: ThemeVariant) {
  return {
    type: CHANGE_THEME,
    payload: variant,
  };
}
