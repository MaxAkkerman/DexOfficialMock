import './AddLiquidity.scss';

import { FormHelperText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../components/Input/Input';
import MainBlock from '../../components/MainBlock/MainBlock';
import PoolConfirmPopup from '../../components/PoolConfirmPopup/PoolConfirmPopup';
import WaitingPopup from '../../components/WaitingPopup/WaitingPopup';
import { PROVIDE_LIQUIDITY_COMMISSION } from '../../constants/commissions';
import {
  NOT_ENOUGH,
  NOT_ENOUGH as NOT_ENOUGH_MSG,
  NOT_ENOUGH_CAUSE_COMMISSION as NOT_ENOUGH_CAUSE_COMMISSION_MSG,
  NOT_TOUCHED,
} from '../../constants/validationMessages';
import useAssetList from '../../hooks/useAssetList';
import {
  getDecimals,
  getFraction,
  getSumsForProvide,
} from '../../reactUtils/reactUtils';
import { showPopup } from '../../store/actions/app';
import {
  setPoolAsyncIsWaiting,
  setPoolFromToken,
  setPoolToToken,
} from '../../store/actions/pool';

function AddLiquidity() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { assetList } = useAssetList();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );

  const pairsList = useSelector((state) => state.walletReducer.pairsList);

  const fromToken = useSelector((state) => state.poolReducer.fromToken);
  const toToken = useSelector((state) => state.poolReducer.toToken);

  const fromValue = useSelector((state) => state.poolReducer.fromInputValue);
  const toValue = useSelector((state) => state.poolReducer.toInputValue);
  const pairId = useSelector((state) => state.poolReducer.pairId);
  const tips = useSelector((state) => state.appReducer.tips);
  const tokenList = useSelector((state) => state.walletReducer.tokenList);

  const poolAsyncIsWaiting = useSelector(
    (state) => state.poolReducer.poolAsyncIsWaiting,
  );

  const [errors, setErrors] = React.useState({});
  const [isError, setIsError] = React.useState(true);

  const [poolConfirmPopupIsVisible, setPoolConfirmPopupIsVisible] =
    useState(false);

  const [rateAB, setRateAB] = useState(0);
  const [rateBA, setRateBA] = useState(0);
  const [rateType, setRateType] = useState('AB');

  const [fromTokenSymbol, setFromTokenSymbol] = useState('');
  const [toTokenSymbol, setTotTokenSymbol] = useState('');
  const [ratesData, setRatesData] = useState({});

  const [incorrectBalance, setincorrectBalance] = useState(false);
  const [incorrectBalanceToValue, setincorrectBalanceToValue] = useState(false);

  const [totalLPs, settotalLPs] = useState(0);
  const [poolSharePercentage, setpoolSharePercentage] = useState(0);

  useEffect(async () => {
    if (!tips || tips.length) return;
    if (tips.name === 'processLiquidityCallback') {
      if (fromToken.symbol || toToken.Symbol) {
        const fromTokenCopy = JSON.parse(JSON.stringify(fromToken));
        const toTokenCopy = JSON.parse(JSON.stringify(toToken));
        const newFromTokenData = tokenList.filter(
          (item) => item.symbol === fromTokenCopy.symbol,
        );
        const newToTokenData = tokenList.filter(
          (item) => item.symbol === toTokenCopy.symbol,
        );

        const fromTokenUpdatedBalance = {
          ...fromTokenCopy,
          balance: newFromTokenData[0].balance,
        };

        const toTokenUpdatedBalance = {
          ...toTokenCopy,
          balance: newToTokenData[0].balance,
        };
        dispatch(setPoolToToken(toTokenUpdatedBalance));
        dispatch(setPoolFromToken(fromTokenUpdatedBalance));
      }
    }
  }, [tokenList]);

  function getTotalLP(qtyA, qtyB, reserveA, reserveB, totalSupplyBefore) {
    let qtyArr = getSumsForProvide(qtyA, qtyB, reserveA, reserveB, 1);
    let provideArr = getSumsForProvide(
      qtyArr[0],
      qtyArr[1],
      reserveA,
      reserveB,
    );
    return Math.min(
      Math.floor((provideArr[0] * totalSupplyBefore) / reserveA),
      Math.floor((provideArr[1] * totalSupplyBefore) / reserveB),
    );
  }

  useEffect(() => {
    if (!pairId) {
    } else {
      const curPair = pairsList.filter(
        (item) => item.pairAddress === pairId,
      )[0];
      console.log('curPair', curPair);
      const totalSupply = curPair.totalSupply;
      const reservesA = curPair.reserveA;
      const reservesB = curPair.reserveB;
      const symbA = curPair.symbolA;
      const symbB = curPair.symbolB;
      //console.log("curPair",curPair)
      console.log('ratesdata', {
        totalSupply: +totalSupply / getDecimals(curPair.decimalsAB),
        reservesA: +reservesA / getDecimals(curPair.decimalsA),
        reservesB: +reservesB / getDecimals(curPair.decimalsB),
        symbA: symbA,
        symbB: symbB,
      });
      setRatesData({
        totalSupply: +totalSupply / getDecimals(curPair.decimalsAB),
        reservesA: +reservesA / getDecimals(curPair.decimalsA),
        reservesB: +reservesB / getDecimals(curPair.decimalsB),
        symbA: symbA,
        symbB: symbB,
      });
    }
  }, [pairId]);

  useEffect(() => {
    if (fromToken && toToken) {
      pairsList.forEach((i) => {
        if (i.symbolA === fromToken.symbol && i.symbolB === toToken.symbol) {
          setRateAB(i.rateAB);
          setRateBA(i.rateBA);
          setRateType('AB');
        } else if (
          i.symbolB === fromToken.symbol &&
          i.symbolA === toToken.symbol
        ) {
          setRateAB(i.rateAB);
          setRateBA(i.rateBA);
          setRateType('BA');
        }
      });

      if (
        (fromTokenSymbol === fromToken.symbol ||
          fromTokenSymbol === toToken.symbol) &&
        (toTokenSymbol === fromToken.symbol || toTokenSymbol === toToken.symbol)
      ) {
      } else {
        setFromTokenSymbol(fromToken.symbol);
        setTotTokenSymbol(toToken.symbol);
      }
    }
  }, [fromToken, toToken]);

  function handleConfirm() {
    if (!fromValue && !toValue) return;

    if (fromValue > fromToken.balance) {
      console.log('return', fromValue, '____', fromToken.balance);
      setincorrectBalance(true);
      setTimeout(() => setincorrectBalance(false), 200);
      return;
    }
    if (toValue > toToken.balance) {
      console.log('return', fromValue, '____', fromToken.balance);
      setincorrectBalanceToValue(true);
      setTimeout(() => setincorrectBalanceToValue(false), 200);
      return;
    }

    if (fromToken.symbol && toToken.symbol && fromValue) {
      // if(fromValue > fromToken.balance ) {
      //   dispatch(showPopup({type: 'error', message: 'Excess of balance'}));
      //   return;
      // }
      setPoolConfirmPopupIsVisible(true);
    } else {
      dispatch(
        showPopup({ type: 'error', message: 'Fields should not be empty' }),
      );
    }
  }

  // function checkValueFrom(){
  //
  // }

  function mixPercentValue(totalLP, totalSup) {
    let percOfTotal = (totalLP * 100) / totalSup;
    return +percOfTotal;
  }

  function handleClose() {
    dispatch(setPoolAsyncIsWaiting(false));
  }

  let totalLP =
    getTotalLP(
      fromValue * 1000000000,
      toValue * 1000000000,
      ratesData.reservesA * 1000000000,
      ratesData.reservesB * 1000000000,
      ratesData.totalSupply * 1000000000,
    ) / 1000000000;

  useEffect(() => {
    if (Object.keys(errors).length === 0) setIsError(false);
    else setIsError(true);
  }, [errors]);

  function validate(fromValue, toValue, fromToken, toToken) {
    console.log(fromToken, toToken);
    if (
      fromToken.symbol &&
      toToken.symbol &&
      fromToken.balance &&
      toToken.balance
    ) {
      const localErrors = {};

      const fromTokenBalance = Number(fromToken.balance);
      const toTokenBalance = Number(toToken.balance);
      if (fromValue > fromTokenBalance)
        localErrors.fromTokenAmount = NOT_ENOUGH_MSG;

      if (toValue > toTokenBalance) localErrors.toTokenAmount = NOT_ENOUGH_MSG;

      if (toValue === 0 || fromValue === 0)
        localErrors.emptyFields = NOT_TOUCHED;

      const tonAsset = assetList.find((t) => t.symbol === 'EVER');
      if (tonAsset && tonAsset.balance) {
        const nativeTONBalance = tonAsset.balance;

        if (nativeTONBalance < PROVIDE_LIQUIDITY_COMMISSION)
          localErrors.commission = `${NOT_ENOUGH_CAUSE_COMMISSION_MSG} (Commission = ${PROVIDE_LIQUIDITY_COMMISSION} EVER)`;
        console.log(localErrors);
        setErrors(localErrors);
      }
    }
  }

  useEffect(() => {
    if (fromToken && toToken) validate(fromValue, toValue, fromToken, toToken);
  }, [fromValue, toValue, fromToken, toToken]);

  useEffect(() => {
    setpoolSharePercentage(0);
    settotalLPs(0);
  }, [fromToken, toToken]);

  useEffect(() => {
    if (!fromValue || !toValue) {
      settotalLPs(0);
      setpoolSharePercentage(0);
      return;
    }
    const totals = (
      getTotalLP(
        fromValue * 1000000000,
        toValue * 1000000000,
        ratesData.reservesA * 1000000000,
        ratesData.reservesB * 1000000000,
        ratesData.totalSupply * 1000000000,
      ) / 1000000000
    ).noExponents();

    const poolShare = mixPercentValue(totalLP, ratesData.totalSupply).toFixed(
      4,
    );

    setpoolSharePercentage(poolShare);
    settotalLPs(totals);
  }, [fromValue, toValue]);

  function getNumType(num) {
    const t = parseFloat(num).noExponents();
    let tt = +t;
    if (Number(tt.toFixed(4)) === 0) {
      return t;
    } else {
      return tt.toFixed(4);
    }
  }
  return (
    <div className="container" style={{ flexDirection: 'column' }}>
      {!poolAsyncIsWaiting && (
        <>
          <div style={{ display: 'contents' }}>
            <MainBlock
              style={{
                borderColor: errors.commission
                  ? 'var(--error)'
                  : 'var(--mainblock-border-color)',
              }}
              smallTitle={false}
              title={
                <Link to="/pool" className="pool-back">
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
                  Add liquidity
                </Link>
              }
              content={
                <div>
                  <Input
                    type={'from'}
                    text={'From'}
                    autoFocus={true}
                    token={fromToken}
                    value={fromValue}
                    ratesData={ratesData}
                    componentName={'provide'}
                    borderError={errors.fromTokenAmount}
                    incorrectBalance={incorrectBalance}
                  />
                  {errors.fromTokenAmount ? (
                    <FormHelperText
                      error
                      sx={{ marginLeft: '27px', color: 'var(--text-color)' }}
                    >
                      {NOT_ENOUGH}
                    </FormHelperText>
                  ) : (
                    <div style={{ height: '22px' }} />
                  )}
                  <svg
                    className="add-liquidity-plus"
                    style={{ marginTop: '26px' }}
                    width="45"
                    height="46"
                    viewBox="0 0 45 46"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.3324 42.0171L19.33 26.1694L3.48234 26.167C3.06611 26.1679 2.6538 26.0866 2.26908 25.9277C1.88435 25.7689 1.5348 25.5356 1.24048 25.2413C0.946162 24.947 0.712873 24.5974 0.554009 24.2127C0.395143 23.828 0.31383 23.4157 0.314741 22.9994C0.313831 22.5832 0.395143 22.1709 0.554008 21.7862C0.712873 21.4014 0.94616 21.0519 1.24048 20.7576C1.5348 20.4632 1.88435 20.23 2.26907 20.0711C2.6538 19.9122 3.06611 19.8309 3.48234 19.8318L19.33 19.8294L19.3324 3.98176C19.3315 3.56553 19.4128 3.15322 19.5717 2.7685C19.7305 2.38378 19.9638 2.03422 20.2581 1.7399C20.5525 1.44558 20.902 1.21229 21.2867 1.05343C21.6715 0.894565 22.0838 0.813252 22.5 0.814161C22.9162 0.813252 23.3285 0.894565 23.7133 1.05343C24.098 1.21229 24.4475 1.44558 24.7419 1.7399C25.0362 2.03422 25.2695 2.38378 25.4283 2.7685C25.5872 3.15322 25.6685 3.56553 25.6676 3.98176L25.67 19.8294L41.5177 19.8318C41.9339 19.8309 42.3462 19.9122 42.7309 20.0711C43.1156 20.23 43.4652 20.4632 43.7595 20.7576C44.0538 21.0519 44.2871 21.4014 44.446 21.7862C44.6049 22.1709 44.6862 22.5832 44.6853 22.9994C44.6862 23.4157 44.6049 23.828 44.446 24.2127C44.2871 24.5974 44.0538 24.947 43.7595 25.2413C43.4652 25.5356 43.1156 25.7689 42.7309 25.9277C42.3462 26.0866 41.9339 26.1679 41.5177 26.167L25.67 26.1694L25.6676 42.0171C25.6685 42.4333 25.5872 42.8456 25.4283 43.2303C25.2695 43.6151 25.0362 43.9646 24.7419 44.2589C24.4475 44.5533 24.098 44.7865 23.7133 44.9454C23.3285 45.1043 22.9162 45.1856 22.5 45.1847C22.0838 45.1856 21.6715 45.1043 21.2867 44.9454C20.902 44.7865 20.5525 44.5533 20.2581 44.2589C19.9638 43.9646 19.7305 43.6151 19.5717 43.2303C19.4128 42.8456 19.3315 42.4333 19.3324 42.0171Z"
                      fill="#41444E"
                    />
                  </svg>
                  <Input
                    type={'to'}
                    text={
                      toValue > 0 ? (
                        <>
                          To <span>(estimated)</span>
                        </>
                      ) : (
                        'To'
                      )
                    }
                    token={toToken}
                    borderError={errors.toTokenAmount}
                    value={toValue}
                    readOnly={
                      ratesData.reservesA && ratesData.reservesB
                        ? 'readOnly'
                        : ''
                    }
                    incorrectBalanceToValue={incorrectBalanceToValue}
                  />
                  {errors.toTokenAmount ? (
                    <FormHelperText
                      error
                      sx={{ marginLeft: '27px', color: 'var(--text-color)' }}
                    >
                      {NOT_ENOUGH}
                    </FormHelperText>
                  ) : (
                    <div style={{ height: '22px' }} />
                  )}
                  {!ratesData.reservesA || !ratesData.reservesB ? (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                      }}
                    >
                      The pair is empty - you can set the rate by supplying it.
                      <div className="add-liquidity-wrapper"></div>
                    </div>
                  ) : (
                    fromToken.symbol &&
                    toToken.symbol && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}
                      >
                        <div className="add-liquidity-wrapper">
                          <div>
                            <span>
                              {
                                totalLPs
                                //todo check
                                // getTotalLP(
                                //     fromValue * 1000000000,
                                //     toValue * 1000000000,
                                //     ratesData.reservesA * 1000000000,
                                //     ratesData.reservesB * 1000000000,
                                //     ratesData.totalSupply * 1000000000,
                                // ) /
                                // 1000000000 !==
                                // 0
                                //     ? getTotalLP(
                                //     fromValue * 1000000000,
                                //     toValue * 1000000000,
                                //     ratesData.reservesA * 1000000000,
                                //     ratesData.reservesB * 1000000000,
                                //     ratesData.totalSupply * 1000000000,
                                //     ) /
                                //     1000000000 <
                                //     0.0001
                                //     ? (
                                //         getTotalLP(
                                //             fromValue * 1000000000,
                                //             toValue * 1000000000,
                                //             ratesData.reservesA * 1000000000,
                                //             ratesData.reservesB * 1000000000,
                                //             ratesData.totalSupply * 1000000000,
                                //         ) / 1000000000
                                //     ).toFixed(6)
                                //     : (
                                //         getTotalLP(
                                //             fromValue * 1000000000,
                                //             toValue * 1000000000,
                                //             ratesData.reservesA * 1000000000,
                                //             ratesData.reservesB * 1000000000,
                                //             ratesData.totalSupply * 1000000000,
                                //         ) / 1000000000
                                //     ).toFixed(4)
                                //     : (
                                //         getTotalLP(
                                //             fromValue * 1000000000,
                                //             toValue * 1000000000,
                                //             ratesData.reservesA * 1000000000,
                                //             ratesData.reservesB * 1000000000,
                                //             ratesData.totalSupply * 1000000000,
                                //         ) / 1000000000
                                //     ).toFixed(4)
                              }
                            </span>
                            You will receive LP tokens
                          </div>

                          <div>
                            <span>
                              {rateType === 'AB'
                                ? getNumType(rateBA)
                                : getNumType(rateAB)}{' '}
                            </span>
                            {fromTokenSymbol} per 1 {toTokenSymbol}
                          </div>

                          <div>
                            <span>
                              {rateType === 'AB'
                                ? getNumType(rateAB)
                                : getNumType(rateBA)}
                            </span>
                            {toTokenSymbol} per 1 {fromTokenSymbol}
                          </div>
                        </div>

                        <div className="add-liquidity-wrapper">
                          <div>
                            <span>{`${poolSharePercentage} %`}</span>
                            Your share of pool
                          </div>
                          <div>
                            <span>{getNumType(ratesData.reservesA)}</span>
                            {fromTokenSymbol} pooled
                          </div>

                          <div>
                            <span>{getNumType(ratesData.reservesB)}</span>
                            {toTokenSymbol} pooled
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {walletIsConnected ? (
                    <button
                      onClick={() => handleConfirm()}
                      className={
                        fromToken.symbol &&
                        toToken.symbol &&
                        fromValue &&
                        toValue &&
                        !isError
                          ? 'btn mainblock-btn'
                          : 'btn mainblock-btn btn--disabled'
                      }
                    >
                      Supply
                    </button>
                  ) : (
                    <button
                      className="btn mainblock-btn"
                      onClick={() => navigate('/account')}
                    >
                      Connect wallet
                    </button>
                  )}
                  {!fromValue && !toValue && (
                    <FormHelperText sx={{ textAlign: 'center' }}>
                      {NOT_TOUCHED}
                    </FormHelperText>
                  )}
                </div>
              }
            />
            {errors.commission && (
              <FormHelperText
                error
                sx={{ color: 'var(--text-color)', textAlign: 'center' }}
              >
                {errors.commission}
              </FormHelperText>
            )}
          </div>
        </>
      )}

      {poolConfirmPopupIsVisible ? (
        <PoolConfirmPopup
          hideConfirmPopup={setPoolConfirmPopupIsVisible.bind(this, false)}
          rateAB={rateAB}
          rateBA={rateBA}
          lpAmount={totalLP < 0.0001 ? totalLP.toFixed(8) : totalLP.toFixed(4)}
        />
      ) : null}

      {poolAsyncIsWaiting ? (
        <WaitingPopup
          text={`Supplying ${fromValue} ${fromToken.symbol} and ${toValue} ${toToken.symbol}`}
          handleClose={() => handleClose()}
        />
      ) : null}
    </div>
  );
}

export default AddLiquidity;
