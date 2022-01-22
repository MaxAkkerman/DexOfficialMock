import './LiquidityItem.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { iconGenerator } from '../../iconGenerator';
import {
  setManageBalance,
  setManageFromToken,
  setManagePairId,
  setManageRateAB,
  setManageRateBA,
  setManageToToken,
} from '../../store/actions/manage';

function LiquidityItem({ balance, symbols }) {
  const tokenList = useSelector((state) => state.walletReducer.tokenList);

  const liquidityList = useSelector(
    (state) => state.walletReducer.liquidityList,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pairsList = useSelector((state) => state.walletReducer.pairsList);
  console.log('symbols', symbols);
  const handleClick = () => {
    const fromToken = symbols[0].replaceAll('DS-W', '');

    let assetsArr = tokenList.concat(liquidityList);
    let fromT;
    let toT;
    const curSymbolPair = [];
    symbols.map((item) => {
      if (item.includes('DS-')) {
        curSymbolPair.push(item.replaceAll('DS-', ''));
      } else {
        curSymbolPair.push(item);
      }
    });
    console.log('curSymbolPair', curSymbolPair);

    assetsArr.map((item) => {
      if (item.symbol === curSymbolPair[0]) {
        fromT = item.symbol;
      }
      if (item.symbol === curSymbolPair[1]) {
        toT = item.symbol;
      }
    });
    console.log('assetsArr', assetsArr);

    dispatch(setManageBalance(balance));

    pairsList.forEach((i) => {
      console.log('pairsList', pairsList, 'to', toT, 'from', fromT);
      if (i.symbolA.includes(fromT) && i.symbolB.includes(toT)) {
        dispatch(setManageFromToken({ symbol: fromT, reserve: i.reserveA }));
        dispatch(setManageToToken({ symbol: toT, reserve: i.reserveB }));
        dispatch(setManagePairId(i.pairAddress));
        dispatch(setManageRateAB(i.rateAB));
        dispatch(setManageRateBA(i.rateBA));
      } else if (i.symbolB.includes(fromT) && i.symbolA.includes(toT)) {
        dispatch(setManageFromToken({ symbol: fromT, reserve: i.reserveB }));
        dispatch(setManageToToken({ symbol: toT, reserve: i.reserveA }));
        dispatch(setManagePairId(i.pairAddress));
        dispatch(setManageRateAB(i.rateAB));
        dispatch(setManageRateBA(i.rateBA));
      }
    });
    navigate('/manage');
  };

  return (
    <div className="liquidity-item">
      <div>
        <img src={iconGenerator(symbols[0])} alt={symbols[0]} />
        <img src={iconGenerator(symbols[1])} alt={symbols[1]} />
        <span className="liquidity-item-text">
          {symbols[0]}/{symbols[1]} LP Tokens
        </span>
      </div>
      <button onClick={handleClick} className="liquidity-item-btn">
        Manage
      </button>
    </div>
  );
}

export default LiquidityItem;
