import { FINISH_TUTORIAL, RESET_TUTORIAL } from '@/store/actions/types';

export function resetTutorial() {
  return {
    type: RESET_TUTORIAL,
  };
}

export function finishTutorial() {
  return {
    type: FINISH_TUTORIAL,
  };
}
