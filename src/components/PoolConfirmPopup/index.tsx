import React from "react";
import { Navigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { iconGenerator } from "../../iconGenerator";
import CloseBtn from "../CloseBtn";
import MainBlock from "../MainBlock";

function PoolConfirmPopup() {
  const dispatch = useAppDispatch();

  const values = useAppSelector((state) => state.provideLiquidityConfirmValues);

  async function handleSuply() {
    /**
     * Handle supply
     */
  }

  if (!values) return null;

  return (
    <div className="popup-wrapper confirm-popup">
      <MainBlock
        smallTitle={true}
        button={<CloseBtn />}
        content={
          <>
            <p className="confirm-subtitle">Provide liquidity Confirm</p>
            <div className="confirm-block">
              <span className="confirm-value">~{values.lpToken.balance}</span>
              <img
                className="confirm-icon"
                src={iconGenerator(values.fromToken.symbol)}
                alt={values.fromToken.symbol}
              />
              <img
                className="confirm-icon"
                src={iconGenerator(values.toToken.symbol)}
                alt={values.toToken.symbol}
              />
              <span className="confirm-tokenF">
                DS-{values.fromToken.symbol}/{values.toToken.symbol} LP Tokens
              </span>
            </div>
            <p className="confirm-text">
              Output is estimated. If the price changes by more than 0.5% your
              transaction will revert
            </p>
            <button className="btn popup-btn" onClick={() => handleSuply()}>
              Confirm Supply
            </button>
          </>
        }
        // footer={
        //   <div className="mainblock-footer">
        //     <div className="mainblock-footer-wrap">
        //       <div>
        //         <div  className="pool-confirm-wrap">
        //           <p className="mainblock-footer-value">0.0001</p>
        //           <p className="mainblock-footer-subtitle">{fromToken.symbol} deposited</p>
        //         </div>
        //         <div>
        //           <p className="mainblock-footer-value">{parseFloat(props.rateBA.toFixed(4))}</p>
        //           <p className="mainblock-footer-subtitle">{fromToken.symbol} per {toToken.symbol}</p>
        //         </div>
        //       </div>
        //       <div>
        //         <div  className="pool-confirm-wrap">
        //           <p className="mainblock-footer-value">10000003</p>
        //           <p className="mainblock-footer-subtitle">{toToken.symbol} deposited</p>
        //         </div>
        //         <div>
        //           <p className="mainblock-footer-value">{parseFloat(props.rateAB.toFixed(4))}</p>
        //           <p className="mainblock-footer-subtitle">{toToken.symbol} per {fromToken.symbol}</p>
        //         </div>
        //       </div>
        //       <div>
        //         <div  className="pool-confirm-wrap">
        //           <p className="mainblock-footer-value">999785</p>
        //           <p className="mainblock-footer-subtitle">Rates</p>
        //         </div>
        //         <div>
        //           <p className="mainblock-footer-value">&lt;0.01%</p>
        //           <p className="mainblock-footer-subtitle">Share of Pool</p>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // }
      />
    </div>
  );
}

export default PoolConfirmPopup;
