import {
  INIT_TON_CONTEXT,
  LP_TOKENS_FETCH_REQUESTED,
  PAIRS_FETCH_REQUESTED,
  RESET_LP_TOKENS,
  RESET_PAIRS,
  RESET_TOKENS,
  RESET_TON_CONTEXT,
  TOKENS_FETCH_REQUESTED,
  UPDATE_TON_CONTEXT,
} from "./types";

export function requestTokensFetch() {
  return { type: TOKENS_FETCH_REQUESTED };
}

export function resetTokens() {
  return { type: RESET_TOKENS };
}

export function requestPairsFetch() {
  return { type: PAIRS_FETCH_REQUESTED };
}

export function resetPairs() {
  return { type: RESET_PAIRS };
}

export function requestLpTokensFetch() {
  return { type: LP_TOKENS_FETCH_REQUESTED };
}

export function resetLpTokens() {
  return { type: RESET_LP_TOKENS };
}

export function initTonContext() {
  return { type: INIT_TON_CONTEXT };
}

export function updateTonContext(name, newValue) {
  return {
    payload: { name, value: newValue },
    type: UPDATE_TON_CONTEXT,
  };
}

export function resetTonContext() {
  return {
    type: RESET_TON_CONTEXT,
  };
}
