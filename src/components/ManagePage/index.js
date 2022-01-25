import "./index.scss";

import React, { useEffect, useState } from "react";
import Slider from "react-rangeslider";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import MainBlock from "../../components/MainBlock";
import ManageConfirmPopup from "../../components/ManageConfirmPopup";
import ReturnLiquidConfirmPopup from "../../components/ReturnLiquidConfirmPopup";
import WaitingPopup from "../../components/WaitingPopup";
import { iconGenerator } from "../../iconGenerator";
import { setManageAsyncIsWaiting } from "../../store/actions/manage";

function Manage() {
  const dispatch = useDispatch();

  const fromToken = useSelector((state) => state.manageReducer.fromToken);
  const toToken = useSelector((state) => state.manageReducer.toToken);
  const rateAB = useSelector((state) => state.manageReducer.rateAB);
  const rateBA = useSelector((state) => state.manageReducer.rateBA);
  const balance = useSelector((state) => state.manageReducer.balance);
  const pairId = useSelector((state) => state.manageReducer.pairId);
  const manageAsyncIsWaiting = useSelector(
    (state) => state.manageReducer.manageAsyncIsWaiting,
  );
  const values = useSelector((state) => state.liquidityReducer.values);

  const [managePopupIsVisible, setManagePopupIsVisible] = useState(true);
  const [manageRemoveIsVisible, setManageRemoveIsVisible] = useState(false);

  const [rangeValue, setRangeValue] = useState(0);
  const [percent, setPercent] = useState(0);

  const [qtyA, setQtyA] = useState(0);
  const [qtyB, setQtyB] = useState(0);

  const [showReturnLiqidPopup, setshowReturnLiqidPopup] = useState(false);

  useEffect(async () => {
    const total = +values.pair.totalSupply;
    setPercent((balance * 100) / total);
  }, []);

  function toggleClick() {
    setManagePopupIsVisible(!managePopupIsVisible);
    setManageRemoveIsVisible(!manageRemoveIsVisible);
  }

  const handleChange = (value) => {
    setRangeValue(value);
    setQtyA((((fromToken.reserve * percent) / 100) * value) / 100);
    setQtyB((((toToken.reserve * percent) / 100) * value) / 100);
  };

  const handleRemove = async () => {
    setshowReturnLiqidPopup(true);
  };

  function handleCloseReturnConfirm() {
    setshowReturnLiqidPopup(false);
  }

  function handleClose() {
    setRangeValue(0);
    setQtyA(0);
    setQtyB(0);
    dispatch(setManageAsyncIsWaiting(false));
  }

  if (!values) return <Navigate to="/swap" />;

  return (
    <div className="container">
      {managePopupIsVisible && (
        <ManageConfirmPopup func={toggleClick.bind(this)} />
      )}

      {manageRemoveIsVisible && !manageAsyncIsWaiting && (
        <MainBlock
          smallTitle={false}
          title={
            <Link to={"/pool"} className="pool-back">
              <svg
                width="12"
                height="19"
                viewBox="0 0 12 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9142 4.4108C11.6953 3.62975 11.6953 2.36342 10.9142 1.58237C10.1332 0.80132 8.86684 0.80132 8.08579 1.58237L10.9142 4.4108ZM2.5 9.99658L1.08579 8.58237C0.304738 9.36342 0.304738 10.6297 1.08579 11.4108L2.5 9.99658ZM8.08579 18.4108C8.86683 19.1918 10.1332 19.1918 10.9142 18.4108C11.6953 17.6297 11.6953 16.3634 10.9142 15.5824L8.08579 18.4108ZM8.08579 1.58237L1.08579 8.58237L3.91421 11.4108L10.9142 4.4108L8.08579 1.58237ZM1.08579 11.4108L8.08579 18.4108L10.9142 15.5824L3.91421 8.58237L1.08579 11.4108Z"
                  fill="white"
                />
              </svg>
              Remove Liquidity
            </Link>
          }
          content={
            <div className="manage">
              <div className="manage-percents">
                <span className="manage-percent-value">{rangeValue}%</span>
                <div className="manage-percents-btns">
                  <div
                    className="manage-percent-btn"
                    onClick={() => handleChange(25)}
                  >
                    25%
                  </div>
                  <div
                    className="manage-percent-btn"
                    onClick={() => handleChange(50)}
                  >
                    50%
                  </div>
                  <div
                    className="manage-percent-btn"
                    onClick={() => handleChange(75)}
                  >
                    75%
                  </div>
                  <div
                    className="manage-percent-btn"
                    onClick={() => handleChange(100)}
                  >
                    100%
                  </div>
                </div>
              </div>
              <Slider
                min={0}
                max={100}
                step={1}
                value={rangeValue}
                onChange={(value) => handleChange(value)}
                tooltip={false}
              />
              <p className="manage-subtitle">Amount</p>
              <div className="manage-token-wrapper">
                <div className="manage-token-balance">
                  {qtyA < 0.0001
                    ? parseFloat(qtyA.toFixed(8))
                    : parseFloat(qtyA.toFixed(4))}
                </div>
                <div className="manage-token-symbol">
                  <img
                    src={iconGenerator(values.pair.symbolA)}
                    alt={values.pair.symbolA}
                  />
                  {values.pair.symbolA}
                </div>
              </div>
              <div className="manage-token-wrapper">
                <div className="manage-token-balance">
                  {qtyB < 0.0001
                    ? parseFloat(qtyB.toFixed(8))
                    : parseFloat(qtyB.toFixed(4))}
                </div>
                <div className="manage-token-symbol">
                  <img
                    src={iconGenerator(values.pair.symbolB)}
                    alt={values.pair.symbolB}
                  />
                  {values.pair.symbolB}
                </div>
              </div>
              <p className="manage-subtitle">Price</p>
              <p className="manage-text">
                1 {values.pair.symbolA} ={" "}
                {values.pair.rateAB < 0.0001
                  ? parseFloat(values.pair.rateAB.toFixed(8))
                  : parseFloat(values.pair.rateAB.toFixed(4))}{" "}
                {values.pair.symbolB}
              </p>
              <p className="manage-text">
                1 {values.pair.symbolB} ={" "}
                {values.pair.rateBA < 0.0001
                  ? parseFloat(values.pair.rateBA.toFixed(8))
                  : parseFloat(values.pair.rateBA.toFixed(4))}{" "}
                {values.pair.symbolA}
              </p>
              <button
                onClick={rangeValue !== 0 ? handleRemove : null}
                className={
                  rangeValue !== 0
                    ? "btn mainblock-btn"
                    : "btn mainblock-btn btn--disabled"
                }
              >
                Remove
              </button>
            </div>
          }
        />
      )}

      {showReturnLiqidPopup ? (
        <ReturnLiquidConfirmPopup
          setRangeValue={setRangeValue}
          qtyA={qtyA}
          qtyB={qtyB}
          setQtyA={setQtyA}
          setQtyB={setQtyB}
          rangeValue={rangeValue}
          fromToken={fromToken}
          toToken={toToken}
          hideConfirmPopup={() => handleCloseReturnConfirm()}
        />
      ) : null}

      {manageAsyncIsWaiting && (
        <WaitingPopup
          text={`Removing ${qtyA.toFixed(4)} ${
            fromToken.symbol
          } and ${qtyB.toFixed(4)} ${toToken.symbol}`}
          // text={`Removing ${qtyA < 0.0001 ? parseFloat(qtyA.toFixed(8)) : parseFloat(qtyA.toFixed(4))} ${fromToken.symbol} and ${qtyB < 0.0001 ? parseFloat(qtyB.toFixed(8)) : parseFloat(qtyB.toFixed(4))} ${toToken.symbol}`}
          handleClose={() => handleClose()}
        />
      )}
    </div>
  );
}

export default Manage;
