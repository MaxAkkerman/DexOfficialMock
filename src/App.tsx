import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Account from "./components/Account";
import AddLiquidity from "./components/AddLiquidityPage";
import Header from "./components/Header/Header";
import Manage from "./components/Manage";
import Notifications from "./components/Notifications";
import PoolConfirmPopup from "./components/PoolConfirmPopup";
import Pool from "./components/PoolPage/Pool";
import RemoveLiquidityPage from "./components/RemoveLiquidityPage";
import ReturnLiquidConfirmPopup from "./components/ReturnLiquidConfirmPopup";
import SwapConfirmPopup from "./components/SwapConfirmPopup";
import SwapPage from "./components/SwapPage";
import WaitingPopup from "./components/WaitingPopup";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import {
  changeThemeAction,
  requestLpTokensFetchAction,
  requestPairsFetchAction,
  requestTokensFetchAction,
} from "./store/actions";
import { ThemeVariant } from "./types";

function App() {
  const dispatch = useAppDispatch();
  const appTheme = useAppSelector((state) => state.appTheme);

  useEffect(() => {
    const theme =
      localStorage.getItem("appTheme") === null
        ? "light"
        : localStorage.getItem("appTheme");
    if (appTheme !== theme) dispatch(changeThemeAction(theme as ThemeVariant));
  }, [dispatch, appTheme]);

  useEffect(() => {
    dispatch(requestTokensFetchAction());
    dispatch(requestPairsFetchAction());
    dispatch(requestLpTokensFetchAction());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/pool" element={<Pool />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/add-liquidity" element={<AddLiquidity />} />
        <Route
          path="/remove-liquidity/:lpTokenAddress"
          element={<RemoveLiquidityPage />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/manage/:lpTokenAddress" element={<Manage />} />
      </Routes>
      <Notifications />
      <WaitingPopup />
      <SwapConfirmPopup />
      <ReturnLiquidConfirmPopup />
      <PoolConfirmPopup />
    </>
  );
}

export default App;
