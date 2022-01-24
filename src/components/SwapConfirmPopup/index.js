import "./index.scss";

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import MainBlock from "../MainBlock";
import { AB_DIRECTION, BA_DIRECTION } from "../../constants/runtimeVariables";
import { iconGenerator } from "../../iconGenerator";
import miniSwap from "../../images/icons/mini-swap.png";
import { resetSwapPopupValues } from "../../store/actions/swap";
import truncateNum from "../../utils/truncateNum";
import { Box, Modal } from "@mui/material";
import { useSnackbar } from "notistack";

export default function SwapConfirmPopup() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const appTheme = useSelector((state) => state.appReducer.appTheme);
  const values = useSelector((state) => state.swapReducer.values);
  const swap = useSelector((state) => state.tonContext.functions.swap);

  const directionPair = useMemo(() => {
    if (!values) return;

    const { fromToken, pair } = values;
    if (fromToken && pair)
      return fromToken.rootAddress === pair.rootA ? AB_DIRECTION : BA_DIRECTION;
  }, [values]);

  const rate = useMemo(() => {
    if (!values) return;

    const { pair } = values;
    if (directionPair)
      return directionPair === AB_DIRECTION ? pair.rateAB : pair.rateBA;
  }, [directionPair, values]);

  async function handleSwap() {
    try {
      const success = await swap();
      if (success)
        enqueueSnackbar({
          type: "success",
          message: "Your wallet is successfully connected",
        });
      else throw new Error(`Function "connectWallet" can't connect`);
    } catch (e) {
      console.error(e);
      enqueueSnackbar({
        type: "error",
        message: "Failed to connect the wallet",
      });
    }
  }

  function handleClose() {
    dispatch(resetSwapPopupValues());
  }

  if (!values) return null;

  return (
    <Modal open={values} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <MainBlock
          button={
            <svg
              onClick={handleClose}
              className="close"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.6"
                d="M21.7676 25.272L13 16.507L4.23239 25.272C4.00265 25.5027 3.7296 25.6858 3.42891 25.8108C3.12822 25.9357 2.80582 26 2.48021 26C2.15459 26 1.83219 25.9357 1.5315 25.8108C1.23081 25.6858 0.957759 25.5027 0.728021 25.272C0.497277 25.0422 0.314182 24.7692 0.189248 24.4685C0.0643133 24.1678 0 23.8454 0 23.5198C0 23.1942 0.0643133 22.8718 0.189248 22.5711C0.314182 22.2704 0.497277 21.9973 0.728021 21.7676L9.49296 13L0.728021 4.23239C0.497277 4.00265 0.314182 3.7296 0.189248 3.42891C0.0643133 3.12822 0 2.80582 0 2.48021C0 2.15459 0.0643133 1.83219 0.189248 1.5315C0.314182 1.23081 0.497277 0.957759 0.728021 0.728021C0.957759 0.497277 1.23081 0.314182 1.5315 0.189248C1.83219 0.0643133 2.15459 0 2.48021 0C2.80582 0 3.12822 0.0643133 3.42891 0.189248C3.7296 0.314182 4.00265 0.497277 4.23239 0.728021L13 9.49296L21.7676 0.728021C21.9973 0.497277 22.2704 0.314182 22.5711 0.189248C22.8718 0.0643133 23.1942 0 23.5198 0C23.8454 0 24.1678 0.0643133 24.4685 0.189248C24.7692 0.314182 25.0422 0.497277 25.272 0.728021C25.5027 0.957759 25.6858 1.23081 25.8108 1.5315C25.9357 1.83219 26 2.15459 26 2.48021C26 2.80582 25.9357 3.12822 25.8108 3.42891C25.6858 3.7296 25.5027 4.00265 25.272 4.23239L16.507 13L25.272 21.7676C25.5027 21.9973 25.6858 22.2704 25.8108 22.5711C25.9357 22.8718 26 23.1942 26 23.5198C26 23.8454 25.9357 24.1678 25.8108 24.4685C25.6858 24.7692 25.5027 25.0422 25.272 25.272C25.0422 25.5027 24.7692 25.6858 24.4685 25.8108C24.1678 25.9357 23.8454 26 23.5198 26C23.1942 26 22.8718 25.9357 22.5711 25.8108C22.2704 25.6858 21.9973 25.5027 21.7676 25.272Z"
                fill="white"
              />
            </svg>
          }
          content={
            <>
              <p className="confirm-subtitle">Confirm Swap</p>
              <div className="confirm-block swap-confirm-block">
                <span className="confirm-token">
                  <img
                    className="confirm-icon"
                    src={iconGenerator(values.fromToken.symbol)}
                    alt={values.fromToken.symbol}
                  />
                  {values.fromValue}
                </span>
                {appTheme === "light" ? (
                  <svg
                    width="68"
                    height="19"
                    viewBox="0 0 68 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M0.897098 10.5H64.9499L58.8496 17.3C58.4908 17.7 58.4908 18.3 58.8496 18.7C59.029 18.9 59.2982 19 59.4776 19C59.657 19 59.9261 18.9 60.1055 18.7L67.7309 10.2C68.0897 9.8 68.0897 9.2 67.7309 8.8L60.1055 0.3C59.7467 -0.1 59.2084 -0.1 58.8496 0.3C58.4908 0.7 58.4908 1.3 58.8496 1.7L64.9499 8.5H0.897098C0.358839 8.5 0 8.9 0 9.5C0 10.1 0.358839 10.5 0.897098 10.5Z"
                      fill="url(#paint0_linear)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="68.0035"
                        y1="9.49999"
                        x2="-13.031"
                        y2="-17.3695"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#41444E" />
                        <stop offset="1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                ) : (
                  <svg
                    className="swap-confirm-arrow"
                    width="68"
                    height="20"
                    viewBox="0 0 68 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.4"
                      d="M0.897098 11H64.9499L58.8496 17.8C58.4908 18.2 58.4908 18.8 58.8496 19.2C59.029 19.4 59.2982 19.5 59.4776 19.5C59.657 19.5 59.9261 19.4 60.1055 19.2L67.7309 10.7C68.0897 10.3 68.0897 9.7 67.7309 9.3L60.1055 0.8C59.7467 0.4 59.2084 0.4 58.8496 0.8C58.4908 1.2 58.4908 1.8 58.8496 2.2L64.9499 9H0.897098C0.358839 9 0 9.4 0 10C0 10.6 0.358839 11 0.897098 11Z"
                      fill="url(#paint0_linear)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear"
                        x1="68.0035"
                        y1="9.99999"
                        x2="-13.031"
                        y2="-16.8695"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="white" />
                        <stop offset="1" stopColor="white" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
                <span className="confirm-value">
                  <img
                    className="confirm-icon"
                    src={iconGenerator(values.toToken.symbol)}
                    alt={values.toToken.symbol}
                  />
                  {truncateNum(values.toValue)}
                </span>
              </div>
              <p className="confirm-text" style={{ marginLeft: "12px" }}>
                Output is estimated. You will receive at least{" "}
                <span>
                  {truncateNum(
                    values.toValue - (values.toValue * values.slippage) / 100,
                  )}{" "}
                  {values.toToken.symbol}
                </span>{" "}
                or the transaction will revert
              </p>
              <button className="btn popup-btn" onClick={() => handleSwap()}>
                Confirm Swap
              </button>
            </>
          }
          footer={
            <div className="mainblock-footer">
              <div className="mainblock-footer-wrap">
                {/*<div>*/}
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    <img src={miniSwap} alt="" /> {truncateNum(rate)}{" "}
                    {values.toToken.symbol}/{values.fromToken.symbol}
                  </p>
                  <p className="mainblock-footer-subtitle">Price</p>
                </div>
                <div className="swap-confirm-wrap">
                  <p className="mainblock-footer-value">
                    {truncateNum((values.fromValue * 0.3) / 100)}{" "}
                    {values.fromToken.symbol}
                  </p>
                  <p className="mainblock-footer-subtitle">
                    Liquidity Provider Fee
                  </p>
                </div>
              </div>
            </div>
          }
        />
      </Box>
    </Modal>
  );
}
