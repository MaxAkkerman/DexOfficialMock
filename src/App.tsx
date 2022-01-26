import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useMount } from "react-use";

import Account from "./components/Account";
import AddLiquidity from "./components/AddLiquidityPage/AddLiquidity";
import Header from "./components/Header/Header";
import Manage from "./components/ManagePage";
import NativeLogin from "./components/NativeLogin/NativeLogin";
import PoolExplorer from "./components/PoolExplorer/PoolExplorer";
import Pool from "./components/PoolPage/Pool";
import SwapPage from "./components/SwapPage";
import WaitingPopup from "./components/WaitingPopup";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { changeTheme } from "./store/actions/app";
import {
  enterSeedPhraseEmptyStorage,
  setEncryptedSeedPhrase,
  showEnterSeedPhraseUnlock,
} from "./store/actions/enterSeedPhrase";
import {
  requestLpTokensFetch,
  requestPairsFetch,
  requestTokensFetch,
} from "./store/actions/ton";

function App() {
  const dispatch = useAppDispatch();
  const appTheme = useAppSelector((state) => state.appReducer.appTheme);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const theme =
      localStorage.getItem("appTheme") === null
        ? "light"
        : localStorage.getItem("appTheme");
    if (appTheme !== theme) dispatch(changeTheme(theme));
  }, [dispatch, appTheme]);

  async function checkOnLogin() {
    let esp = localStorage.getItem("esp");
    if (esp === null) dispatch(enterSeedPhraseEmptyStorage(true));
    else if (typeof esp === "string") {
      // const receiveTokensData = JSON.parse(localStorage.getItem("setSubscribeReceiveTokens"))
      // dispatch(setSubscribeReceiveTokens(receiveTokensData))
      dispatch(enterSeedPhraseEmptyStorage(false));
      dispatch(setEncryptedSeedPhrase(esp));
      dispatch(showEnterSeedPhraseUnlock());
    } else dispatch(enterSeedPhraseEmptyStorage(true));
  }

  const tips = useAppSelector((state) => state.appReducer.tips);

  useMount(async () => {
    await checkOnLogin();
  });

  useEffect(() => {
    dispatch(requestPairsFetch());
    dispatch(requestTokensFetch());
    dispatch(requestLpTokensFetch());
  }, [dispatch]);

  useEffect(() => {
    if (tips.message === "Copied")
      enqueueSnackbar({
        type: "info",
        message: "Copied to the clipboard",
      });
  }, [tips, enqueueSnackbar]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/native-login" element={<NativeLogin />} />
        <Route path="/pool-explorer" element={<PoolExplorer />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/add-liquidity" element={<AddLiquidity />} />
        <Route path="/account" element={<Account />} />
        <Route path="/manage" element={<Manage />} />
      </Routes>
      <WaitingPopup />
    </>
  );
}

export default App;
