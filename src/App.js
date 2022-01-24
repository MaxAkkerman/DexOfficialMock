import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation, } from 'react-router-dom';
import { useMount } from 'react-use';

import SwapConfirmPopup from './components-v2/SwapConfirmPopup';
import SwapPage from './components-v2/SwapPage';
import WaitingPopup from './components-v2/WaitingPopup';
import {
  requestPairsFetch,
  requestTokensFetch,
  updateTonContext,
} from './store/actions/ton';

import Header from './components/Header/Header';
import NativeLogin from './components/NativeLogin/NativeLogin';
import PoolExplorer from './components/PoolExplorer/PoolExplorer';
import Popup from './components/Popup/Popup';
import RevealSeedPhrase from './components/RevealSeedPhrase/RevealSeedPhrase';
import KeysBlock from './components/WalletSettings/KeysBlock';
import WalletSettings from './components/WalletSettings/WalletSettings';
import AddLiquidity from './pages/AddLiquidity/AddLiquidity';
import Pool from './pages/Pool/Pool';
import {
  getAllPairsAndSetToStore,
  getAllTokensAndSetToStore,
} from './reactUtils/reactUtils';
import { changeTheme, hideTip } from './store/actions/app';
import {
  enterSeedPhraseEmptyStorage,
  setEncryptedSeedPhrase,
  showEnterSeedPhraseUnlock,
} from './store/actions/enterSeedPhrase';
import {
  setAssetsFromGraphQL,
  setPairsList,
  setSubscribeReceiveTokens,
} from './store/actions/wallet';
import { setNFTassets } from './store/actions/walletSeed';

// TODO: Mock functions. To delete later
function getAllPairsWoithoutProvider() {}
function agregateQueryNFTassets() {}
function getAssetsForDeploy() {}

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const openEnterSeed = useSelector((state) => state.appReducer.openEnterSeed);

  const popup = useSelector((state) => state.appReducer.popup);
  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const swapAsyncIsWaiting = useSelector(
    (state) => state.swapReducer.swapAsyncIsWaiting,
  );
  const poolAsyncIsWaiting = useSelector(
    (state) => state.poolReducer.poolAsyncIsWaiting,
  );
  const manageAsyncIsWaiting = useSelector(
    (state) => state.manageReducer.manageAsyncIsWaiting,
  );
  const revealSeedPhraseIsVisible = useSelector(
    (state) => state.enterSeedPhrase.revealSeedPhraseIsVisible,
  );

  const visibleEnterSeedPhraseUnlock = useSelector(
    (state) => state.enterSeedPhrase.enterSeedPhraseUnlockIsVisible,
  );
  const emptyStorage = useSelector(
    (state) => state.enterSeedPhrase.emptyStorage,
  );
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const tips = useSelector((state) => state.appReducer.tips);
  const transListReceiveTokens = useSelector(
    (state) => state.walletReducer.transListReceiveTokens,
  );

  const { enqueueSnackbar } = useSnackbar();

  const [onloading, setonloading] = useState(false);

  useEffect(async () => {
    // await getAllPairsAndSetToStore()
    const pairs2 = await getAllPairsWoithoutProvider();
    dispatch(setPairsList(pairs2));
    setonloading(false);
  }, []);

  useEffect(async () => {
    setonloading(true);
    const theme =
      localStorage.getItem('appTheme') === null
        ? 'light'
        : localStorage.getItem('appTheme');
    if (appTheme !== theme) dispatch(changeTheme(theme));
    setonloading(false);
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', function (e) {
      if (swapAsyncIsWaiting || poolAsyncIsWaiting || manageAsyncIsWaiting)
        e.returnValue = '';
    });
  }, [swapAsyncIsWaiting, poolAsyncIsWaiting, manageAsyncIsWaiting]);

  async function checkOnLogin() {
    let esp = localStorage.getItem('esp');
    if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true));
    else if (typeof esp === 'string') {
      // const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
      // dispatch(setSubscribeReceiveTokens(receiveTokensData))
      dispatch(enterSeedPhraseEmptyStorage(false));
      dispatch(setEncryptedSeedPhrase(esp));
      dispatch(showEnterSeedPhraseUnlock());
    } else dispatch(enterSeedPhraseEmptyStorage(true));
  }

  useMount(async () => {
    await checkOnLogin();
  });

  useEffect(async () => {
    console.log(' useeffect agregateQueryNFTassets');
    const NFTassets = await agregateQueryNFTassets(clientData.address);
    // setAssets(NFTassets)
    dispatch(setNFTassets(NFTassets));
  }, [clientData.address]);

  useEffect(async () => {
    if (!tips) return;
    if (
      tips.type === 'error' ||
      tips.message === 'Sent message to blockchain' ||
      tips.message === 'Copied'
    ) {
      enqueueSnackbar({ message: tips.message, type: tips.type });
      return;
    }

    const newTransList = JSON.parse(JSON.stringify(transListReceiveTokens));
    const NFTassets = await agregateQueryNFTassets(clientData.address);
    dispatch(setNFTassets(NFTassets));
    if (tips.name === 'connectRoot') {
      await getAllPairsAndSetToStore(clientData.address);
      await getAllTokensAndSetToStore(clientData.address);
    }
    if (tips.name === 'acceptedPairTokens') {
      console.log('i at acceptedPairTokens');
      setTimeout(
        async () => await getAllTokensAndSetToStore(clientData.address),
        10000,
      );
    }

    if (
      tips.name === 'tokensReceivedCallback' ||
      tips.name === 'processLiquidityCallback' ||
      tips.name === 'sendTokens' ||
      tips.name === 'connectRoot' ||
      tips.name === 'UpdateBalanceTONs'
    ) {
      console.log('i was here', tips);
      await getAllTokensAndSetToStore(clientData.address);
      dispatch(requestPairsFetch());
      dispatch(requestTokensFetch());
    }
    enqueueSnackbar({ message: tips.message, type: tips.type });
    newTransList.push(tips);
    dispatch(setSubscribeReceiveTokens(newTransList));
  }, [tips]);

  function onTipClosed() {
    dispatch(hideTip());
  }

  useEffect(async () => {
    const addrArray = await getAssetsForDeploy();
    dispatch(setAssetsFromGraphQL(addrArray));
  }, []);

  useEffect(() => {
    dispatch(requestPairsFetch());
    dispatch(requestTokensFetch());
  }, []);

  useEffect(() => {
    if (clientData.status) {
      dispatch(updateTonContext('dexClientAddress', clientData.address));
      dispatch(requestPairsFetch());
      dispatch(requestTokensFetch());
    }
  }, [clientData]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/native-login" element={<NativeLogin />} />
        <Route path="/pool-explorer" element={<PoolExplorer />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/add-liquidity" element={<AddLiquidity />} />

        {walletIsConnected ? (
          <>
            <Route path="/wallet/settings/keys" element={<KeysBlock />} />
            <Route path="/wallet/settings" element={<WalletSettings />} />
          </>
        ) : null}
        {!walletIsConnected && clientData.address && !clientData.status ? (
          <>
            <Route path="/wallet/settings/keys" element={<KeysBlock />} />
            <Route path="/wallet/settings" element={<WalletSettings />} />
          </>
        ) : null}
      </Routes>
      {popup.isVisible ? (
        <Popup type={popup.type} message={popup.message} link={popup.link} />
      ) : null}
      {revealSeedPhraseIsVisible ? <RevealSeedPhrase /> : null}
      <SwapConfirmPopup />
      <WaitingPopup />
    </>
  );
}

export default App;
