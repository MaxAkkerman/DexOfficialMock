import "./index.scss";

import { useFormik } from "formik";
import compact from "lodash/compact";
import every from "lodash/every";
import find from "lodash/find";
import reject from "lodash/reject";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

import Button from "../Button";
import Input from "../Input";
import MainBlock from "../MainBlock";
import SelectPopup from "../SelectPopup";
import SettingsButton from "../SettingsButton";
import SlippagePopup from "../SlippagePopup";
import SwapButton from "../SwapButton";
import { AB_DIRECTION, BA_DIRECTION } from "../../constants/runtimeVariables";
import useSelectPopup from "../../hooks/useSelectPopup";
import { setSlippageValue, setSwapPopupValues } from "../../store/actions/swap";
import truncateNum from "../../utils/truncateNum";
import SwapConfirmPopup from "../SwapConfirmPopup";

export default function SwapPage() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const walletConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const tokens = useSelector((state) => state.tonData.tokens);
  const pairs = useSelector((state) => state.tonData.pairs);
  const slippage = useSelector((state) => state.swapReducer.slippage);
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const connectWallet = useSelector(
    (state) => state.tonContext.functions.connectWallet,
  );

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    values,
  } = useFormik({
    initialValues: {
      fromToken: null,
      fromValue: "",
      pair: null,
      slippage,
      toToken: null,
      toValue: "",
    },
    onSubmit: handleSwap,
    validate,
  });

  const fromTokens = useMemo(() => {
    if (!values.toToken) return tokens;
    let leftTokens = reject(tokens, values.toToken);

    const leftPairs = pairs.filter(
      (p) =>
        p.rootA === values.toToken.rootAddress ||
        p.rootB === values.toToken.rootAddress,
    );
    leftTokens = leftPairs.map(
      (p) =>
        find(leftTokens, { rootAddress: p.rootA }) ||
        find(leftTokens, { rootAddress: p.rootB }),
    );

    return compact(leftTokens);
  }, [tokens, pairs, values.toToken]);

  const toTokens = useMemo(() => {
    if (!values.fromToken) return tokens;
    let leftTokens = reject(tokens, values.fromToken);

    const leftPairs = pairs.filter(
      (p) =>
        p.rootA === values.fromToken.rootAddress ||
        p.rootB === values.fromToken.rootAddress,
    );
    leftTokens = leftPairs.map(
      (p) =>
        find(leftTokens, { rootAddress: p.rootA }) ||
        find(leftTokens, { rootAddress: p.rootB }),
    );

    return compact(leftTokens);
  }, [tokens, pairs, values.fromToken]);

  // Find the pair
  useEffect(() => {
    if (!pairs.length || !values.fromToken || !values.toToken) return;

    setFieldValue(
      "pair",
      find(pairs, {
        rootA: values.fromToken.rootAddress,
        rootB: values.toToken.rootAddress,
      }) ||
        find(pairs, {
          rootA: values.toToken.rootAddress,
          rootB: values.fromToken.rootAddress,
        }),
    );
  }, [pairs, values.fromToken, values.toToken, setFieldValue]);

  const directionPair = useMemo(() => {
    if (values.fromToken && values.pair)
      return values.fromToken.rootAddress === values.pair.rootA
        ? AB_DIRECTION
        : BA_DIRECTION;
  }, [values.fromToken, values.pair]);

  const rate = useMemo(() => {
    if (directionPair)
      return directionPair === AB_DIRECTION
        ? values.pair.rateAB
        : values.pair.rateBA;
  }, [directionPair, values.pair]);

  // Calculate "To" value
  useEffect(() => {
    setFieldValue("toValue", values.fromValue * rate);
  }, [values.fromValue, rate, setFieldValue]);

  function handleSwap(values) {
    dispatch(setSwapPopupValues(values));
  }

  const handleConnectWallet = useCallback(async () => {
    try {
      const success = await connectWallet();
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
  }, [connectWallet, enqueueSnackbar]);

  function handleTokensInvert() {
    setFieldValue("fromToken", values.toToken);
    setFieldValue("toToken", values.fromToken);
    setFieldValue("fromValue", values.toValue);
    setFieldValue("toValue", values.fromValue);
  }

  function handleMaxClick() {
    setFieldValue("fromValue", values.fromToken.balance);
  }

  const currentState = useMemo(() => {
    if (!walletConnected) return "CONNECT_WALLET";
    else if (!clientData.status && clientData.address.length === 66)
      return "DEPLOY_WALLET";
    else return "DO_SWAP";
  }, [walletConnected]);

  const CurrentButton = useMemo(() => {
    const props = {
      className: "mainblock-btn",
    };

    switch (currentState) {
      case "CONNECT_WALLET":
        props.children = "Connect wallet";
        props.onClick = handleConnectWallet;
        props.type = "button";
        break;
      case "DEPLOY_WALLET":
        props.children = "Deploy wallet";
        props.type = "button";
        break;
      default:
        props.children = "Swap";
        props.type = "submit";
    }

    return function CurrentButton(p) {
      return <Button {...props} {...p} />;
    };
  }, [currentState, clientData, handleConnectWallet]);

  // Store slippage globally
  useEffect(() => {
    if (values.slippage !== slippage)
      dispatch(setSlippageValue(values.slippage));
  }, [values.slippage, slippage, dispatch]);

  // Update selected token balance after swap
  useEffect(() => {
    if (values.fromToken)
      setFieldValue(
        "fromToken",
        find(tokens, { rootAddress: values.fromToken.rootAddress }),
      );
    if (values.toToken)
      setFieldValue(
        "toToken",
        find(tokens, { rootAddress: values.toToken.rootAddress }),
      );
  }, [values.fromToken, values.toToken, tokens, setFieldValue]);

  // Update selected pair rate after swap
  useEffect(() => {
    if (values.pair)
      setFieldValue(
        "pair",
        find(pairs, { pairAddress: values.pair.pairAddress }),
      );
  }, [values.pair, pairs, setFieldValue]);

  const slippagePopup = useSlippagePopup((v) => setFieldValue("slippage", v));
  const selectFromPopup = useSelectPopup((t) => setFieldValue("fromToken", t));
  const selectToPopup = useSelectPopup((t) => setFieldValue("toToken", t));
  const valuesPopup = useSelector((state) => state.swapReducer.values);

  return (
    <>
      <div className="container">
        {valuesPopup ? (
          <SwapConfirmPopup />
        ) : (
          <MainBlock
            content={
              <div style={{ display: "contents" }}>
                <div className="head_wrapper" style={{ marginBottom: "40px" }}>
                  <div
                    className="left_block"
                    style={{ color: "var(--mainblock-title-color)" }}
                  >
                    Swap
                  </div>
                  <div className="settings_btn_container">
                    <SettingsButton
                      aria-describedby={slippagePopup.id}
                      onClick={slippagePopup.handleClick}
                    />
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <Input
                    label="From"
                    name="fromValue"
                    value={values.fromValue}
                    onMaxClick={handleMaxClick}
                    onValueChange={handleChange}
                    onValueBlur={handleBlur}
                    onSelectClick={selectFromPopup.handleOpen}
                    token={values.fromToken}
                    error={
                      touched.fromValue &&
                      (errors.fromValue || errors.fromToken)
                    }
                    helperText={
                      touched.fromValue &&
                      (errors.fromValue || errors.fromToken)
                    }
                  />
                  <SwapButton
                    onClick={handleTokensInvert}
                    className="swap-btn"
                    type="button"
                  />
                  <Input
                    className="input"
                    label="To"
                    name="toValue"
                    notExact
                    value={values.toValue}
                    onValueChange={handleChange}
                    onValueBlur={handleBlur}
                    onSelectClick={selectToPopup.handleOpen}
                    token={values.toToken}
                    error={touched.toToken && errors.toToken}
                    helperText={
                      (touched.toToken && errors.toToken) ||
                      "Field is automatically calculated"
                    }
                    readOnly
                  />
                  <CurrentButton />
                  {rate ? (
                    <p className="swap-rate">
                      Price{" "}
                      <span>
                        {truncateNum(rate)} {values.toToken.symbol}
                      </span>{" "}
                      per <span>1 {values.fromToken.symbol}</span>
                    </p>
                  ) : null}
                </form>
              </div>
            }
            footer={
              values.fromToken &&
              values.toToken && (
                <div className="mainblock-footer">
                  <div
                    className="mainblock-footer-wrap"
                    style={{ justifyContent: "space-around" }}
                  >
                    <div className="swap-confirm-wrap">
                      <p className="mainblock-footer-value">
                        {truncateNum(
                          values.toValue -
                            (values.toValue * values.slippage) / 100,
                        )}{" "}
                        {values.toToken.symbol}
                      </p>
                      <p className="mainblock-footer-subtitle">
                        Minimum <br /> received
                      </p>
                    </div>
                    <div className="swap-confirm-wrap">
                      <p className="mainblock-footer-value">
                        {values.pair
                          ? truncateNum((values.fromValue * 0.3) / 100)
                          : 0.0}{" "}
                        {values.fromToken.symbol}
                      </p>
                      <p className="mainblock-footer-subtitle">
                        Liquidity <br /> Provider Fee
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          />
        )}
      </div>
      {selectFromPopup.open && (
        <SelectPopup
          tokens={fromTokens}
          onClose={selectFromPopup.handleClose}
          onSelect={selectFromPopup.handleSelect}
        />
      )}
      {selectToPopup.open && (
        <SelectPopup
          tokens={toTokens}
          onClose={selectToPopup.handleClose}
          onSelect={selectToPopup.handleSelect}
        />
      )}
      {slippagePopup.open && (
        <SlippagePopup
          id={slippagePopup.id}
          open={slippagePopup.open}
          anchorEl={slippagePopup.anchorEl}
          onClose={slippagePopup.handleClick}
          value={values.slippage}
          onChange={slippagePopup.handleChange}
        />
      )}
    </>
  );
}

function useSlippagePopup(setValue) {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  function handleChange(values) {
    setValue(values.floatValue);
  }

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return {
    anchorEl,
    handleChange,
    handleClick,
    id,
    open,
  };
}

function validate(values) {
  const errors = {};

  const MUST_BE_NUMBER = "Input value must be a number";
  const POSITIVE_NUMBER = "Use positive number";
  const SELECT_TOKEN = "You must select token";
  const BALANCE_EXCEEDS = "Input value exceeds balance";

  if (isNaN(+values.fromValue)) errors.fromValue = MUST_BE_NUMBER;
  else if (values.fromValue <= 0) errors.fromValue = POSITIVE_NUMBER;

  if (isNaN(+values.toValue)) errors.toValue = MUST_BE_NUMBER;
  else if (values.toValue <= 0) errors.toValue = POSITIVE_NUMBER;

  if (!values.fromToken) errors.fromToken = SELECT_TOKEN;
  else if (values.fromValue > values.fromToken.balance)
    errors.fromToken = BALANCE_EXCEEDS;

  if (!values.toToken) errors.toToken = SELECT_TOKEN;

  return errors;
}
