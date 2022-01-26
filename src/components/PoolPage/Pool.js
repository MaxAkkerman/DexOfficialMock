import "./Pool.scss";

import { useMemo } from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { setLiquidityValues } from "../../store/actions/liquidity";
import { requestConnectWallet } from "../../store/actions/wallet";
import LiquidityItem from "../LiquidityItem/LiquidityItem";
import MainBlock from "../MainBlock";

function Pool() {
  const dispatch = useAppDispatch();

  const walletIsConnected = useAppSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const pairs = useAppSelector((state) => state.tonData.pairs);
  const lpTokens = useAppSelector((state) => state.tonData.lpTokens);
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

  function handleConnectWallet() {
    dispatch(requestConnectWallet());
  }

  return (
    <div className="container">
      <MainBlock
        class={"pool"}
        title="Liquidity pools"
        content={
          !walletIsConnected ? (
            <button className="btn mainblock-btn" onClick={handleConnectWallet}>
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
