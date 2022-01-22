import {
  CLOSE_LIMIT_ORDER_CANCEL_POPUP,
  CLOSE_LIMIT_ORDER_DEPLOY_POPUP,
  CLOSE_LIMIT_ORDER_UPDATE_POPUP,
  OPEN_LIMIT_ORDER_CANCEL_POPUP,
  OPEN_LIMIT_ORDER_DEPLOY_POPUP,
  OPEN_LIMIT_ORDER_UPDATE_POPUP,
  RESET_LIMIT_ORDER_POPUP_VALUES,
  SET_LIMIT_ORDER_POPUP_VALUES,
} from './types';

export function setLimitOrderPopupValues(values) {
  return {
    payload: values,
    type: SET_LIMIT_ORDER_POPUP_VALUES,
  };
}

export function resetLimitOrderPopupValues() {
  return {
    type: RESET_LIMIT_ORDER_POPUP_VALUES,
  };
}

export function openLimitOrderCancelPopup() {
  return {
    type: OPEN_LIMIT_ORDER_CANCEL_POPUP,
  };
}

export function closeLimitOrderCancelPopup() {
  return {
    type: CLOSE_LIMIT_ORDER_CANCEL_POPUP,
  };
}

export function openLimitOrderDeployPopup() {
  return {
    type: OPEN_LIMIT_ORDER_DEPLOY_POPUP,
  };
}

export function closeLimitOrderDeployPopup() {
  return {
    type: CLOSE_LIMIT_ORDER_DEPLOY_POPUP,
  };
}

export function openLimitOrderUpdatePopup() {
  return {
    type: OPEN_LIMIT_ORDER_UPDATE_POPUP,
  };
}

export function closeLimitOrderUpdatePopup() {
  return {
    type: CLOSE_LIMIT_ORDER_UPDATE_POPUP,
  };
}

// TODO: Later delete; mock action creators
export function setOrdersFromToken() {}
export function setOrdersToToken() {}
export function setOrdersPairId() {}
export function hideOrdersFromSelect() {}
export function hideOrdersToSelect() {}