import "./Pool.scss";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";

import LiquidityItem from "../LiquidityItem/LiquidityItem";
import MainBlock from "../MainBlock";
import { setLiquidityValues } from "../../store/actions/liquidity";

function Pool() {
  const navigate = useNavigate();
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const dispatch = useDispatch();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const pairs = useSelector((state) => state.tonData.pairs);
  const connectWallet = useSelector(
    (state) => state.tonContext.functions.connectWallet,
  );
  const lpTokens = useSelector((state) => state.tonData.lpTokens);
  const lpTokensWithPairs = useMemo(
    () =>
      lpTokens.map((t) => ({
        ...t,
        pair: pairs.find((p) => p.pairAddress === t.pairAddress),
      })),
    [lpTokens, pairs],
  );

  function handleClick(e, t) {
    dispatch(setLiquidityValues(t));
  }

  return (
    <div className="container">
      <MainBlock
        class={"pool"}
        title="Liquidity pools"
        content={
          !walletIsConnected ? (
            <button className="btn mainblock-btn" onClick={connectWallet}>
              Connect wallet
            </button>
          ) : (
            <div className="pool-wrapper">
              {!pairs.length
                ? "You don’t have liquidity pairs yet"
                : lpTokensWithPairs.map((t) => (
                    <LiquidityItem
                      symbols={[t.pair.symbolA, t.pair.symbolB]}
                      balance={t.balance}
                      key={t.walletAddress}
                      onClick={(e) => handleClick(e, t)}
                    />
                  ))}
            </div>
          )
        }
      />
    </div>
  );
}

export default Pool;
