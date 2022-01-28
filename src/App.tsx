import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Account from "./components/Account";
import AddLiquidity from "./components/AddLiquidityPage/AddLiquidity";
import Header from "./components/Header/Header";
import NativeLogin from "./components/NativeLogin/NativeLogin";
import Pool from "./components/PoolPage/Pool";
import SwapPage from "./components/SwapPage";
import WaitingPopup from "./components/WaitingPopup";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { changeThemeAction } from "./store/actions";
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

  return (
    <>
      <Header />
      <Routes>
        <Route path="/native-login" element={<NativeLogin />} />
        <Route path="/pool" element={<Pool />} />
        <Route path="/swap" element={<SwapPage />} />
        <Route path="/add-liquidity" element={<AddLiquidity />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <WaitingPopup />
    </>
  );
}

export default App;
