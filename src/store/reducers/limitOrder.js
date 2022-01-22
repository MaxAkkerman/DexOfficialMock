import produce from 'immer';

import {
  CLOSE_LIMIT_ORDER_CANCEL_POPUP,
  CLOSE_LIMIT_ORDER_DEPLOY_POPUP,
  CLOSE_LIMIT_ORDER_UPDATE_POPUP,
  OPEN_LIMIT_ORDER_CANCEL_POPUP,
  OPEN_LIMIT_ORDER_DEPLOY_POPUP,
  OPEN_LIMIT_ORDER_UPDATE_POPUP,
  RESET_LIMIT_ORDER_POPUP_VALUES,
  SET_LIMIT_ORDER_POPUP_VALUES,
} from '../actions/types';

const initialState = {
  cancelPopupVisible: false,
  deployPopupVisible: false,
  updatePopupVisible: false,
  values: null,
};

export default function limitOrderReducer(
  state = initialState,
  { payload, type },
) {
  switch (type) {
    case SET_LIMIT_ORDER_POPUP_VALUES:
      return produce(state, (draft) => {
        draft.values = payload;
      });
    case RESET_LIMIT_ORDER_POPUP_VALUES:
      return produce(state, (draft) => {
        draft.values = null;
      });
    case OPEN_LIMIT_ORDER_CANCEL_POPUP:
      return produce(state, (draft) => {
        draft.cancelPopupVisible = true;
      });
    case CLOSE_LIMIT_ORDER_CANCEL_POPUP:
      return produce(state, (draft) => {
        draft.cancelPopupVisible = false;
      });
    case OPEN_LIMIT_ORDER_DEPLOY_POPUP:
      return produce(state, (draft) => {
        draft.deployPopupVisible = true;
      });
    case CLOSE_LIMIT_ORDER_DEPLOY_POPUP:
      return produce(state, (draft) => {
        draft.deployPopupVisible = false;
      });
    case OPEN_LIMIT_ORDER_UPDATE_POPUP:
      return produce(state, (draft) => {
        draft.updatePopupVisible = true;
      });
    case CLOSE_LIMIT_ORDER_UPDATE_POPUP:
      return produce(state, (draft) => {
        draft.updatePopupVisible = false;
      });
    default:
      return state;
  }
}
