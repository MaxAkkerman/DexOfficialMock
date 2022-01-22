import {
  RESET_SWAP_POPUP_VALUES,
  SET_SLIPPAGE,
  SET_SWAP_POPUP_VALUES,
} from './types';

export function setSwapPopupValues(values) {
  return {
    payload: values,
    type: SET_SWAP_POPUP_VALUES,
  };
}

export function resetSwapPopupValues() {
  return {
    type: RESET_SWAP_POPUP_VALUES,
  };
}

export function setSlippageValue(value) {
  return {
    payload: value,
    type: SET_SLIPPAGE,
  };
}

// TODO: Later delete; mock action creators
export function setSwapFromInputValue() {}
export function setSwapRate() {}
export function setSwapToInputValue() {}
export function showSwapFromSelect() {}
export function showSwapToSelect() {}
export function setSwapFromToken() {}
export function setSwapToToken() {}
export function setSwapPairId() {}
export function hideSwapFromSelect() {}
export function hideSwapToSelect() {}