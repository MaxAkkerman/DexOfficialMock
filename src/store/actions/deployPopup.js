import { HIDE_DEPLOY_POPUP, SHOW_DEPLOY_POPUP } from '@/store/actions/types';

export function showDeployPopup() {
  return {
    type: SHOW_DEPLOY_POPUP,
  };
}

export function hideDeployPopup() {
  return {
    type: HIDE_DEPLOY_POPUP,
  };
}
