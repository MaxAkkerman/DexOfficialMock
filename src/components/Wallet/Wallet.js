import "./Wallet.scss";

import React from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../../hooks/useAppSelector";
import { iconGenerator } from "../../iconGenerator";

function Wallet() {
  const navigate = useNavigate();

  const clientData = useAppSelector((state) => state.walletReducer.clientData);
  const updatedWallet = useAppSelector(
    (state) => state.walletReducer.updatedWallet,
  );

  return (
    <div className="wallet">
      {/*{walletIsConnected &&*/}
      <div className="wallet-wrap" onClick={() => navigate("/account")}>
        <span className="wallet-ballance">
          {updatedWallet === null
            ? clientData.balance.toFixed(4)
            : updatedWallet.toFixed(4)}{" "}
          <img width={15} src={iconGenerator("STACKING")} />
        </span>
        <span className="wallet-key">
          {clientData.address.slice(0, 5)}...{clientData.address.slice(-4)}
        </span>
      </div>
      {/*}*/}
    </div>
  );
}

export default Wallet;
