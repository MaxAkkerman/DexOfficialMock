import './Select.scss';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  hideOrdersFromSelect,
  hideOrdersToSelect,
} from '../../store/actions/limitOrder';
import { hidePoolFromSelect, hidePoolToSelect } from '../../store/actions/pool';
import { hideSwapFromSelect, hideSwapToSelect } from '../../store/actions/swap';
import includesTextInToken from '../../utils/includesTextInToken';
import CloseBtn from '../CloseBtn/CloseBtn';
import Loader from '../Loader/Loader';
import MainBlock from '../MainBlock/MainBlock';
import SearchInput from '../SearchInput/SearchInput';
import SelectItem from '../SelectItem/SelectItem';

function Select(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  const tokenList = useSelector((state) => state.walletReducer.tokenList);
  const pairsList = useSelector((state) => state.walletReducer.pairsList);

  const poolFromToken = useSelector((state) => state.poolReducer.fromToken);
  let fromToken = poolFromToken;

  const poolToToken = useSelector((state) => state.poolReducer.toToken);
  let toToken = poolToToken;

  const [filter, setFilter] = useState('');
  // useEffect(() => {
  let fromArr = [];

  pairsList.forEach((i) => {
    fromArr.push({
      balance: 0,
      symbol: i.symbolA,
      walletAddress: '',
      // fullName:getFullName(i.symbolA)
    });
    fromArr.push({
      balance: 0,
      symbol: i.symbolB,
      walletAddress: '',
      // fullName:getFullName(i.symbolA)
    });
  });

  fromArr = fromArr.filter(
    (i, index, arr) => arr.findIndex((j) => j.symbol === i.symbol) === index,
  );

  fromArr.forEach((i, index) => {
    tokenList.forEach((j) => {
      if (i.symbol === j.symbol) {
        fromArr[index].balance = j.balance;
        fromArr[index].walletAddress = j.walletAddress;
      }
    });
  });

  let toArr = [];
  if (props.type === 'to') {
    const arr = pairsList.filter(
      (i) => i.symbolA === fromToken.symbol || i.symbolB === fromToken.symbol,
    );
    console.log(arr);

    arr.forEach((i) => {
      if (fromToken.symbol === i.symbolA) {
        toArr.push({
          balance: 0,
          pairId: i.pairAddress,
          symbol: i.symbolB,
          walletAddress: '',
          // fullName:getFullName(i.symbolA)
        });
      } else if (fromToken.symbol === i.symbolB) {
        toArr.push({
          balance: 0,
          pairId: i.pairAddress,
          symbol: i.symbolA,
          walletAddress: '',
          // fullName:getFullName(i.symbolA)
        });
      }
    });

    toArr.forEach((i, index) => {
      tokenList.forEach((j) => {
        if (i.symbol === j.symbol) {
          toArr[index].balance = j.balance;
          toArr[index].walletAddress = j.walletAddress;
        }
      });
    });
  }
  // console.log('render select');
  // if(toTokenList.length || fromTokenList.length) { setIsLoading(false); }
  // });
  console.log('pairsList', pairsList, 'fromArr', fromArr, 'toArr', toArr);

  function handleClose(e) {
    console.log('fromArr, toArr', fromArr, toArr);
    if (
      e.target.id === 'swapPopup' ||
      e.target.id === 'searchBtn' ||
      e.target.id === 'searchBtnInp' ||
      e.target.id === 'mainBlock' ||
      e.target.id === 'mainBlockTitle'
    )
      return;

    if (location.pathname.includes('swap')) {
      return props.type === 'from'
        ? dispatch(hideSwapFromSelect())
        : dispatch(hideSwapToSelect());
    } else if (location.pathname.includes('add-liquidity')) {
      return props.type === 'from'
        ? dispatch(hidePoolFromSelect())
        : dispatch(hidePoolToSelect());
    } else if (location.pathname.includes('orders')) {
      return props.type === 'from'
        ? dispatch(hideOrdersFromSelect())
        : dispatch(hideOrdersToSelect());
    }
  }

  return ReactDOM.createPortal(
    <div className="select-wrapper" onClick={(e) => handleClose(e)}>
      <MainBlock
        title={'Select a token'}
        button={<CloseBtn func={() => handleClose()} />}
        content={
          !pairsList.length ? (
            <Loader />
          ) : (
            <>
              <SearchInput func={setFilter} />
              <div className="select-list">
                {props.type === 'from' &&
                  fromArr
                    .sort((a, b) => b.balance - a.balance)
                    .filter((t) => includesTextInToken(t, filter))
                    .filter((it) => it.balance !== 0)
                    .map((item) => (
                      <SelectItem
                        type={props.type}
                        walletAddress={item.walletAddress}
                        symbol={item.symbol}
                        balance={item.balance}
                        isActive={fromToken.symbol === item.symbol}
                        fullName={item.fullName}
                        key={item.symbol}
                      />
                    ))}
                {props.type === 'to' &&
                  toArr
                    .sort((a, b) => b.balance - a.balance)
                    .filter((item) =>
                      item.symbol.toLowerCase().includes(filter.toLowerCase()),
                    )
                    .filter((it) => it.balance !== 0)
                    .map((item) => (
                      <SelectItem
                        type={props.type}
                        pairId={item.pairId}
                        walletAddress={item.walletAddress}
                        symbol={item.symbol}
                        balance={item.balance}
                        isActive={toToken.symbol === item.symbol}
                        key={item.symbol}
                      />
                    ))}
              </div>
            </>
          )
        }
      />
    </div>,
    document.querySelector('body'),
  );
}

export default Select;
