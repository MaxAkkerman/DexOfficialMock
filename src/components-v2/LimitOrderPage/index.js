import cls from 'classnames';
import { useFormik } from 'formik';
import compact from 'lodash/compact';
import every from 'lodash/every';
import find from 'lodash/find';
import reject from 'lodash/reject';
import uniq from 'lodash/uniq';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../Button';
import Input from '../Input';
import MainBlock from '../MainBlock';
import SelectPopup from '../SelectPopup';
import SmallInput from '../SmallInput';
import SwapButton from '../SwapButton';
import { AB_DIRECTION, BA_DIRECTION } from '../../constants/runtimeVariables';
import useSelectPopup from '../../hooks/useSelectPopup';
import {
  openLimitOrderDeployPopup,
  setLimitOrderPopupValues,
} from '../../store/actions/limitOrder';
import truncateNum from '../../utils/truncateNum';

import classes from './index.module.scss';

export default function LimitOrderPage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const walletConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );
  const tokens = useSelector((state) => state.tonData.tokens);
  const pairs = useSelector((state) => state.tonData.pairs);
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
    setFieldError,
    setFieldValue,
    touched,
    values,
  } = useFormik({
    initialValues: {
      fromToken: null,
      fromValue: '',
      pair: null,
      toPrice: '',
      toToken: null,
      toValue: '',
    },
    onSubmit: handleCreateLimitOrder,
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
    setFieldValue('toValue', values.fromValue * values.toPrice);
  }, [values.fromValue, values.toPrice]);

  function handleCreateLimitOrder() {
    dispatch(setLimitOrderPopupValues(values));
    dispatch(openLimitOrderDeployPopup());
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

  function handleSetToMarket() {
    if (!rate) setFieldError('pair', 'You must select pair');
    else setFieldValue('toPrice', rate);
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
        props.children = 'Create limit order';
        props.type = 'submit';
    }

    return function CurrentButton(p) {
      return <Button {...props} {...p} />;
    };
  }, [walletConnected, values.pair, values.fromToken, values.toToken]);

  // Update selected token balance after creating a limit order
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

  const selectFromPopup = useSelectPopup((t) => setFieldValue('fromToken', t));
  const selectToPopup = useSelectPopup((t) => setFieldValue('toToken', t));

  return (
    <>
      <div className="container">
        <MainBlock
          error={Boolean(errors.pair)}
          helperText={errors.pair}
          content={
            <div>
              <div className="head_wrapper" style={{ marginBottom: '40px' }}>
                <div
                  className="left_block"
                  style={{ color: 'var(--mainblock-title-color)' }}
                >
                  Limit order
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <Input
                  label="From"
                  name="fromValue"
                  value={values.fromValue}
                  onValueBlur={handleBlur}
                  onValueChange={handleChange}
                  onSelectClick={selectFromPopup.handleOpen}
                  onMaxClick={handleMaxClick}
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
                  label="To"
                  className={classes.input}
                  name="toValue"
                  notExact
                  value={values.toValue}
                  onValueBlur={handleBlur}
                  onValueChange={handleChange}
                  onSelectClick={selectToPopup.handleOpen}
                  token={values.toToken}
                  error={touched.toToken && errors.toToken}
                  helperText={
                    (touched.toToken && errors.toToken) ||
                    'Field is automatically calculated'
                  }
                  readOnly
                />
                {walletConnected && (
                  <div className={classes.orders__price_box}>
                    <SmallInput
                      name="toPrice"
                      label="Limit order price"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onSetToMarket={handleSetToMarket}
                      token={values.toToken}
                      touched={touched.toPrice}
                      value={values.toPrice}
                      error={touched.toPrice && errors.toPrice}
                      helperText={touched.toPrice && errors.toPrice}
                    />
                    <button
                      className={cls('btn', classes.set_market_btn)}
                      onClick={handleSetToMarket}
                      type="button"
                    >
                      Set to market
                    </button>
                  </div>
                )}
                <CurrentButton />
                {values.pair && (
                  <p className="swap-rate">
                    Price{' '}
                    <span>
                      {truncateNum(rate)} {values.toToken.symbol}
                    </span>{' '}
                    per <span>1 {values.fromToken.symbol}</span>
                  </p>
                )}
              </form>
            </div>
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
    </>
  );
}

function validate(values) {
  const errors = {};

  const MUST_BE_NUMBER = 'Input value must be a number';
  const POSITIVE_NUMBER = 'Use positive number';
  const SELECT_TOKEN = 'You must select token';
  const BALANCE_EXCEEDS = 'Input value exceeds balance';

  if (isNaN(+values.fromValue)) errors.fromValue = MUST_BE_NUMBER;
  else if (values.fromValue <= 0) errors.fromValue = POSITIVE_NUMBER;

  if (isNaN(+values.toPrice)) errors.toPrice = MUST_BE_NUMBER;
  else if (values.toPrice <= 0) errors.toPrice = POSITIVE_NUMBER;

  if (!values.fromToken) errors.fromToken = SELECT_TOKEN;
  else if (values.fromValue > values.fromToken.balance)
    errors.fromToken = BALANCE_EXCEEDS;

  if (!values.toToken) errors.toToken = SELECT_TOKEN;

  return errors;
}
