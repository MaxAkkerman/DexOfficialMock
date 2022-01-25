import { RESET_LIQUIDITY_VALUES, SET_LIQUIDITY_VALUES } from "../actions/types";

const initialState = {
  values: null,
};

export default function liquidityReducer(
  state = initialState,
  { payload, type },
) {
  switch (type) {
    case SET_LIQUIDITY_VALUES:
      return {
        values: payload,
      };
    case RESET_LIQUIDITY_VALUES:
      return {
        values: null,
      };
    default:
      return state;
  }
}
