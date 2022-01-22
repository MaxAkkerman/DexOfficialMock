import {
  RESET_WAITING_POPUP_VALUES,
  SET_WAITING_POPUP_VALUES,
} from '../actions/types';

const initialState = {
  values: null,
};

export default function waitingPopup(state = initialState, { payload, type }) {
  switch (type) {
    case SET_WAITING_POPUP_VALUES:
      return {
        values: payload,
      };
    case RESET_WAITING_POPUP_VALUES:
      return {
        values: null,
      };
    default:
      return state;
  }
}
