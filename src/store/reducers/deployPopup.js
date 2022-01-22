import { HIDE_DEPLOY_POPUP, SHOW_DEPLOY_POPUP } from '../actions/types';

const initialState = {
  visible: false,
};

export default function deployPopup(state = initialState, { type }) {
  switch (type) {
    case SHOW_DEPLOY_POPUP:
      return {
        visible: true,
      };
    case HIDE_DEPLOY_POPUP:
      return {
        visible: false,
      };
    default:
      return state;
  }
}
