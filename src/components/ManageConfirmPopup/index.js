import "./index.scss";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { iconGenerator } from "../../iconGenerator";
import {
  setPoolFromToken,
  setPoolPairId,
  setPoolToToken,
} from "../../store/actions/pool";
import MainBlock from "../MainBlock";
import CloseBtn from "../CloseBtn";

function ManageConfirmPopup(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenList = useSelector((state) => state.tonData.tokens);
  const fromToken = useSelector((state) => state.manageReducer.fromToken);
  const toToken = useSelector((state) => state.manageReducer.toToken);
  const balance = useSelector((state) => state.manageReducer.balance);
  const pairId = useSelector((state) => state.manageReducer.pairId);
  const pairS = useSelector((state) => state.walletReducer.pairsList);
  const values = useSelector((state) => state.liquidityReducer.values);

  let curPair = values.pair;

  const [poolShare, setPoolShare] = useState(1);
  const [pooledTokensA, setpooledTokensA] = useState(1);
  const [pooledTokensB, setpooledTokensB] = useState(1);

  useEffect(() => {
    if (!curPair[0]) return;
    let curP = curPair;
    let poolS =
      (balance * 100) /
      (curP && (curP.totalSupply ? curP.totalSupply : 1) / 1000000000);
    setPoolShare(poolS);
  }, [pairId]);

  useEffect(() => {
    let curP = curPair;
    const tokeB = tokenList.filter((item) => item.symbol === curP.symbolB);
    console.log("tokeB", tokeB);

    let pooledTokensA = ((curP.reserveA / 1000000000) * poolShare) / 100;
    let pooledTokensB = ((curP.reserveB / 1000000000) * poolShare) / 100;

    setpooledTokensA(pooledTokensA);
    setpooledTokensB(pooledTokensB);
  }, [poolShare]);

  const handleSupplyClick = () => {
    tokenList
      .filter((it) => !it.symbol.includes("DS"))
      .forEach((i) => {
        if (i.symbol.includes(fromToken.symbol)) {
          console.log("fromToken.symbol", fromToken.symbol);
          dispatch(
            setPoolFromToken({
              symbol: i.symbol,
              balance: i.balance,
            }),
          );
        } else if (i.symbol.includes(toToken.symbol)) {
          console.log("toToken.symbol", toToken.symbol);

          dispatch(
            setPoolToToken({
              symbol: i.symbol,
              balance: i.balance,
            }),
          );
        }
      });

    dispatch(setPoolPairId(pairId));
    navigate("/add-liquidity");
  };

  function handleClose() {
    navigate("/pool");
  }

  return (
    <div className="popup-wrapper">
      <MainBlock
        class={"manage-confirm"}
        button={<CloseBtn onClick={handleClose} />}
        content={
          <>
            <div className="confirm-block">
              <span className="confirm-value supply">
                {parseFloat(balance.toFixed(4))}
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
            <button
              onClick={handleSupplyClick}
              to={"/add-liquidity"}
              className="btn popup-btn"
            >
              Supply
            </button>
            {balance !== 0 ? (
              <div className="manage-remove-link">
                <span onClick={() => props.func()}>Remove</span>
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
                    {parseFloat(balance.toFixed(4))}
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
