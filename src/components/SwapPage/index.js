import './index.scss';

import { useFormik } from 'formik';
import compact from 'lodash/compact';
import every from 'lodash/every';
import find from 'lodash/find';
import reject from 'lodash/reject';
import uniq from 'lodash/uniq';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import Input from '../Input';
import MainBlock from '../MainBlock';
import SelectPopup from '../SelectPopup';
import SettingsButton from '../SettingsButton';
import SlippagePopup from '../SlippagePopup';
import SwapButton from '../SwapButton';
import { AB_DIRECTION, BA_DIRECTION } from '../../constants/runtimeVariables';
import useSelectPopup from '../../hooks/useSelectPopup';
import { setSlippageValue, setSwapPopupValues } from '../../store/actions/swap';
import truncateNum from '../../utils/truncateNum';

export default function SwapPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const walletConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const tokens = useSelector((state) => state.tonData.tokens);
  const pairs = useSelector((state) => state.tonData.pairs);
  const slippage = useSelector((state) => state.swapReducer.slippage);
  const clientData = useSelector((state) => state.walletReducer.clientData);
  // TODO: Remove when returning to storybook
  const allTokens = useSelector(
    (state) => state.walletReducer.assetsFromGraphQL,
  );
  // TODO: Remove when returning to storybook
  const pairTokens = useMemo(() => {
    let tokenList = [];

    pairs.forEach((p) => {
      tokenList.push(find(allTokens, { rootAddress: p.rootA }));
      tokenList.push(find(allTokens, { rootAddress: p.rootB }));
    });

    tokenList = uniq(tokenList);
    tokenList = tokenList.map((t) => {
      t.balance = 0;
      return t;
    });
    tokenList = tokenList.map((t) => {
      const clientToken = find(tokens, { rootAddress: t.rootAddress });
      return clientToken || t;
    });

    return tokenList;
  }, [pairs, allTokens]);

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
      fromValue: '',
      pair: null,
      slippage,
      toToken: null,
      toValue: '',
    },
    onSubmit: handleSwap,
    validate,
  });

  const fromTokens = useMemo(() => {
    let leftTokens = pairTokens.filter((t) => !t.symbol.startsWith('DS-'));
    if (!values.toToken) return leftTokens;
    leftTokens = reject(leftTokens, values.toToken);

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
console.log("fromTokens",leftTokens)
    return compact(leftTokens);
  }, [pairTokens, values.toToken]);

  const toTokens = useMemo(() => {
    let leftTokens = pairTokens.filter((t) => !t.symbol.startsWith('DS-'));
    if (!values.fromToken) return leftTokens;
    leftTokens = reject(leftTokens, values.fromToken);

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
    console.log("toTokens",leftTokens)

    return compact(leftTokens);
  }, [pairTokens, values.fromToken]);

  // Find the pair
  useEffect(() => {
    const { fromToken, toToken } = values;
    if (!pairs.length || !fromToken || !toToken) return;

    setFieldValue(
      'pair',
      find(pairs, {
        rootA: fromToken.rootAddress,
        rootB: toToken.rootAddress,
      }) ||
        find(pairs, {
          rootA: toToken.rootAddress,
          rootB: fromToken.rootAddress,
        }),
    );
  }, [pairs, values.fromToken, values.toToken]);

  const directionPair = useMemo(() => {
    const { fromToken, pair } = values;
    if (fromToken && pair)
      return fromToken.rootAddress === pair.rootA ? AB_DIRECTION : BA_DIRECTION;
  }, [values.fromToken, values.pair]);

  const rate = useMemo(() => {
    const { pair } = values;
    if (directionPair)
      return directionPair === AB_DIRECTION ? pair.rateAB : pair.rateBA;
  }, [directionPair, values.pair]);

  // Calculate "To" value
  useEffect(() => {
    setFieldValue('toValue', values.fromValue * rate);
  }, [values.fromValue, rate]);

  function handleSwap(values) {
    dispatch(setSwapPopupValues(values));
  }

  async function handleConnectPair() {
    /**
     * Handle a pair connect
     */
  }

  function handleConnectWallet() {
    navigate('/account');
  }

  function handleTokensInvert() {
    setFieldValue('fromToken', values.toToken);
    setFieldValue('toToken', values.fromToken);
    setFieldValue('fromValue', values.toValue);
    setFieldValue('toValue', values.fromValue);
  }

  function handleMaxClick() {
    setFieldValue('fromValue', values.fromToken.balance);
  }

  const currentState = useMemo(() => {
    if (!walletConnected) return 'CONNECT_WALLET';
    else if (
      values.fromToken &&
      values.toToken &&
      values.pair &&
      !every(values.pair.walletExists, 'status')
    )
      return 'CONNECT_PAIR';
    else return 'DO_SWAP';
  });

  const CurrentButton = useMemo(() => {
    const props = {
      className: 'mainblock-btn',
    };

    switch (currentState) {
      case 'CONNECT_WALLET':
        props.children =
          !clientData.status && clientData.address.length === 66
            ? 'Deploy wallet'
            : 'Connect wallet';
        props.onClick = handleConnectWallet;
        props.type = 'button';
        break;
      case 'CONNECT_PAIR':
        props.children = 'Connect pair';
        props.onClick = handleConnectPair;
        props.type = 'button';
        break;
      default:
        props.children = 'Swap';
        props.type = 'submit';
    }

    return function CurrentButton(p) {
      return <Button {...props} {...p} />;
    };
  }, [walletConnected, values.pair, values.fromToken, values.toToken]);

  // Store slippage globally
  useEffect(() => {
    if (values.slippage !== slippage)
      dispatch(setSlippageValue(values.slippage));
  }, [values.slippage]);

  // Update selected token balance after swap
  useEffect(() => {
    if (values.fromToken)
      setFieldValue(
        'fromToken',
        find(pairTokens, { rootAddress: values.fromToken.rootAddress }),
      );
    if (values.toToken)
      setFieldValue(
        'toToken',
        find(pairTokens, { rootAddress: values.toToken.rootAddress }),
      );
  }, [pairTokens]);

  // Update selected pair rate after swap
  useEffect(() => {
    if (values.pair)
      setFieldValue(
        'pair',
        find(pairs, { pairAddress: values.pair.pairAddress }),
      );
  }, [pairs]);

  const slippagePopup = useSlippagePopup((v) => setFieldValue('slippage', v));
  const selectFromPopup = useSelectPopup((t) => setFieldValue('fromToken', t));
  const selectToPopup = useSelectPopup((t) => setFieldValue('toToken', t));

  return (
    <>
      <div className="container">
        <MainBlock
          content={
            <div style={{ display: 'contents' }}>
              <div className="head_wrapper" style={{ marginBottom: '40px' }}>
                <div
                  className="left_block"
                  style={{ color: 'var(--mainblock-title-color)' }}
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
                    touched.fromValue && (errors.fromValue || errors.fromToken)
                  }
                  helperText={
                    touched.fromValue && (errors.fromValue || errors.fromToken)
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
                    'Field is automatically calculated'
                  }
                  readOnly
                />
                <CurrentButton />
                {rate ? (
                  <p className="swap-rate">
                    Price{' '}
                    <span>
                      {truncateNum(rate)} {values.toToken.symbol}
                    </span>{' '}
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
                  style={{ justifyContent: 'space-around' }}
                >
                  <div className="swap-confirm-wrap">
                    <p className="mainblock-footer-value">
                      {truncateNum(
                        values.toValue -
                          (values.toValue * values.slippage) / 100,
                      )}{' '}
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
                        : 0.0}{' '}
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
  const id = open ? 'simple-popper' : undefined;

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

  const MUST_BE_NUMBER = 'Input value must be a number';
  const POSITIVE_NUMBER = 'Use positive number';
  const SELECT_TOKEN = 'You must select token';
  const BALANCE_EXCEEDS = 'Input value exceeds balance';

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
