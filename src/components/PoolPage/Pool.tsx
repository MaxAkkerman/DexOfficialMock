import "./Pool.scss";

import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { connectWalletAction } from "../../store/actions";
import { LpToken, Pair } from "../../types";
import LiquidityItem from "../LiquidityItem/LiquidityItem";
import MainBlock from "../MainBlock";

interface LpTokenWithPair extends LpToken {
  pair: Pair;
}

function Pool() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const walletIsConnected = useAppSelector((state) => state.client);
  const pairs = useAppSelector((state) => state.pairs);
  const lpTokens = useAppSelector((state) => state.lpTokens);

  function handleConnectWallet() {
    dispatch(connectWalletAction());
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
                : lpTokens.map((t) => (
                    <LiquidityItem lpToken={t} key={t.walletAddress} />
                  ))}
            </div>
          )
        }
      />
    </div>
  );
}

export default Pool;
