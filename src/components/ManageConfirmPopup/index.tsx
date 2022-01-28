import "./index.scss";

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { iconGenerator } from "../../iconGenerator";
import { addLiquidityAction } from "../../store/actions";
import { ProvideLiquidityValuesConfirm } from "../../types";
import CloseBtn from "../CloseBtn";
import MainBlock from "../MainBlock";

function ManageConfirmPopup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const values = useAppSelector((state) => state.provideLiquidityConfirmValues);

  const [poolShare, setPoolShare] = useState(1);
  const [pooledTokensA, setpooledTokensA] = useState(1);
  const [pooledTokensB, setpooledTokensB] = useState(1);

  useEffect(() => {
    if (!values) return;

    let poolS =
      (values.lpToken.balance * 100) /
      (values.pair &&
        (values.pair.totalSupply ? values.pair.totalSupply : 1) / 1000000000);
    setPoolShare(poolS);
  }, [values]);

  useEffect(() => {
    if (!values) return;

    let pooledTokensA = ((values.pair.reserveA / 1000000000) * poolShare) / 100;
    let pooledTokensB = ((values.pair.reserveB / 1000000000) * poolShare) / 100;

    setpooledTokensA(pooledTokensA);
    setpooledTokensB(pooledTokensB);
  }, [values, poolShare]);

  const handleSupplyClick = () => {
    dispatch(addLiquidityAction(values as ProvideLiquidityValuesConfirm));
  };

  function handleClose() {
    navigate("/pool");
  }

  if (!values) return <Navigate to="/pool" />;

  return (
    <div className="popup-wrapper">
      <MainBlock
        class={"manage-confirm"}
        button={<CloseBtn onClick={handleClose} />}
        content={
          <>
            <div className="confirm-block">
              <span className="confirm-value supply">
                {parseFloat(values.lpToken.balance.toFixed(4))}
              </span>
              <img
                className="confirm-icon"
                src={iconGenerator(values.pair.symbolA)}
                alt={values.pair.symbolA}
              />
              <img
                className="confirm-icon"
                src={iconGenerator(values.pair.symbolB)}
                alt={values.pair.symbolB}
              />
              <span className="confirm-token">
                DS-{values.pair.symbolA}/{values.pair.symbolB} LP Tokens
              </span>
            </div>
            <button onClick={handleSupplyClick} className="btn popup-btn">
              Supply
            </button>
            {values.lpToken.balance !== 0 ? (
              <div className="manage-remove-link">
                <span
                  onClick={() =>
                    navigate(`/manage/remove/${values.pair.pairAddress}`)
                  }
                >
                  Remove
                </span>
              </div>
            ) : null}
          </>
        }
        footer={
          <div className="mainblock-footer">
            <div className="mainblock-footer-wrap">
              <div>
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {parseFloat(values.lpToken.balance.toFixed(4))}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Your total pool tokens
                  </p>
                </div>
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {poolShare.toFixed(4)} %
                  </p>
                  <p className="mainblock-footer-subtitle">Your pool share</p>
                </div>
              </div>
              <div>
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {pooledTokensA.toFixed(4)}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Your pooled {values.pair.symbolA}
                  </p>
                </div>
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {pooledTokensB.toFixed(4)}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Your pooled {values.pair.symbolB}
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default ManageConfirmPopup;
