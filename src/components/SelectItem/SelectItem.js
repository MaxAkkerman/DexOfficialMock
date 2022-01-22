import './SelectItem.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { iconGenerator } from '../../iconGenerator';
import { getFullName } from '../../reactUtils/reactUtils';
import {
  hideOrdersFromSelect,
  hideOrdersToSelect,
  setOrdersFromToken,
  setOrdersPairId,
  setOrdersToToken,
} from '../../store/actions/limitOrder';
import {
  hidePoolFromSelect,
  hidePoolToSelect,
  setPoolFromToken,
  setPoolPairId,
  setPoolToInputValue,
  setPoolToToken,
} from '../../store/actions/pool';
import {
  hideSwapFromSelect,
  hideSwapToSelect,
  setSwapFromToken,
  setSwapPairId,
  setSwapRate,
  setSwapToInputValue,
  setSwapToToken,
} from '../../store/actions/swap';

function SelectItem(props) {
  const dispatch = useDispatch();
  const location = useLocation();

  const walletIsConnected = useSelector(
    (state) => state.appReducer.walletIsConnected,
  );

  const swapToToken = useSelector((state) => state.swapReducer.toToken);
  const poolToToken = useSelector((state) => state.poolReducer.toToken);

  async function handleClick() {
    if (props.type === 'from') {
      const payload = {
        walletAddress: '',
        symbol: props.symbol,
        balance: props.balance,
      };
      if (location.pathname.includes('swap')) {
        dispatch(setSwapFromToken(payload));
        if (swapToToken.symbol) {
          const payload = {
            walletAddress: '',
            symbol: '',
            balance: 0,
          };
          dispatch(setSwapToToken(payload));
          dispatch(setSwapToInputValue(0));
          dispatch(setSwapRate(0));
          dispatch(setSwapPairId(''));
        }
        dispatch(hideSwapFromSelect());
      } else if (location.pathname.includes('add-liquidity')) {
        dispatch(setPoolFromToken(payload));
        if (poolToToken.symbol) {
          const payload = {
            walletAddress: '',
            symbol: '',
            balance: 0,
          };
          dispatch(setPoolToToken(payload));
          dispatch(setPoolToInputValue(0));
          dispatch(setPoolPairId(''));
        }
        dispatch(hidePoolFromSelect());
      } else if (location.pathname.includes('orders')) {
        dispatch(setOrdersFromToken(payload));
        if (poolToToken.symbol) {
          const payload = {
            walletAddress: '',
            symbol: '',
            balance: 0,
          };
          dispatch(setOrdersToToken(payload));
          dispatch(setOrdersToToken(0));
          dispatch(setOrdersPairId(''));
        }
        dispatch(hideOrdersFromSelect());
      }
    }
    if (props.type === 'to') {
      const payload = {
        walletAddress: '',
        symbol: props.symbol,
        balance: props.balance,
      };
      if (location.pathname.includes('swap')) {
        dispatch(setSwapToToken(payload));
        dispatch(setSwapPairId(props.pairId));
        dispatch(hideSwapToSelect());
      } else if (location.pathname.includes('add-liquidity')) {
        dispatch(setPoolToToken(payload));
        dispatch(setPoolPairId(props.pairId));
        dispatch(hidePoolToSelect());
      } else if (location.pathname.includes('orders')) {
        dispatch(setOrdersToToken(payload));
        dispatch(setOrdersPairId(props.pairId));
        dispatch(hideOrdersToSelect());
      }
    }
  }

  return (
    // <div className={props.isActive ? "select-item select-item--active" : "select-item"}
    <div className={'select-item'} onClick={() => handleClick()}>
      <div className="select-item-wrapper">
        <img
          style={{ width: '54px', height: '54px' }}
          src={iconGenerator(props.symbol)}
          alt={props.symbol}
        />
        <div>
          <p className="select-item-title">{props.symbol}</p>
          <p className="select-item-descr">{getFullName(props.symbol)}</p>
        </div>
      </div>
      {walletIsConnected && (
        <span className="select-item-balance">
          {props.balance < 0.0001
            ? parseFloat(props.balance.toFixed(8))
            : parseFloat(props.balance.toFixed(4))}
        </span>
      )}
    </div>
  );
}

export default SelectItem;
