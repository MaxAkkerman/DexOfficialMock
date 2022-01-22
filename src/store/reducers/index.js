import { combineReducers } from 'redux';

import appReducer from './app';
import chromePopup from './chromePopup';
import clientWallets from './clientWallets';
import deployPopup from './deployPopup';
import enterSeedPhrase from './enterSeedPhrase';
import limitOrderReducer from './limitOrder';
import manageReducer from './manage';
import poolReducer from './pool';
import poolExplorer from './poolExplorer';
import stakingReducer from './stake';
import swapReducer from './swap';
import tonContext from './tonContext';
import tonData from './tonData';
import waitingPopup from './waitingPopup';
import walletReducer from './wallet';
import walletSeedReducer from './walletSeed';

export default combineReducers({
  appReducer,
  chromePopup,
  clientWallets,
  deployPopup,
  enterSeedPhrase,
  limitOrderReducer,
  manageReducer,
  poolExplorer,
  poolReducer,
  stakingReducer,
  swapReducer,
  tonContext,
  tonData,
  waitingPopup,
  walletReducer,
  walletSeedReducer,
});
