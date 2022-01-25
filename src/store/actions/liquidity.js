import { RESET_LIQUIDITY_VALUES, SET_LIQUIDITY_VALUES } from "./types";

export function setLiquidityValues(values) {
  return {
    payload: values,
    type: SET_LIQUIDITY_VALUES,
  };
}

export function resetLiquidityValues() {
  return {
    type: RESET_LIQUIDITY_VALUES,
  };
}
