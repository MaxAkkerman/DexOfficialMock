import './PoolExplorerItem.scss';

import React from 'react';

import { iconGenerator } from '../../../iconGenerator';
import { getDecimals } from '../../../reactUtils/reactUtils';

function PoolExplorerItem(props) {
  console.log('thisprops', props);

  function getReserves(num, dec) {
    console.log('num, dec', num, dec);
    if (!num) {
      return 0;
    } else {
      return Number(
        (parseFloat(num) / getDecimals(dec)).toFixed(4),
      ).toLocaleString('ru-RU');
    }
  }

  function getPairRate(rate) {
    console.log('rate', rate);
    if (!rate) {
      return 0;
    }
    if (rate < 0.0001) {
      return parseFloat(rate).toFixed(8);
    } else {
      return parseFloat(rate).toFixed(4);
    }
  }

  return (
    <React.Fragment>
      <div>
        <div className="poolExplorer__box">
          <span className="poolExplorer__box_text none">Pair</span>
          <div className="poolExplorer__box_pair">
            <img
              className="poolExplorer__icon_margin"
              src={iconGenerator(props.pair.symbolA)}
              alt={props.pair.symbolA}
            />
            <img
              className="poolExplorer__icon_margin"
              style={{ marginLeft: '-15px' }}
              src={iconGenerator(props.pair.symbolB)}
              alt={props.pair.symbolB}
            />
            <b>{props.pair.symbolA}</b>
          </div>
          <span className="poolExplorer__box_text">/</span>
          <div className="poolExplorer__box_pair">
            <b>{props.pair.symbolB}</b>
          </div>
        </div>
        <div className="select-item poolExplorer">
          <div className="poolExplorer__pair_rate">
            <div className="poolExplorer__reserve">
              <span className="select-item-description">
                <div>
                  1 {props.pair.symbolA} ={' '}
                  <b>{getPairRate(props.pair.rateAB)}</b> {props.pair.symbolB}
                </div>
              </span>
            </div>
            <div className="poolExplorer__reserve">
              <span className="select-item-description">
                <div>
                  1 {props.pair.symbolB} ={' '}
                  <b>{getPairRate(props.pair.rateBA)}</b> {props.pair.symbolA}
                </div>
              </span>
            </div>
          </div>

          <div className={'PoolExplorerItem_pair_reserve_box'}>
            <span>Pair</span>
            <span>reserve</span>
          </div>

          <div className="poolExplorer__fixed_width">
            <div className="poolExplorer__reserve">
              <img
                className="poolExplorer__icon"
                style={{ width: '32px', height: '32px' }}
                src={iconGenerator(props.pair.symbolA)}
                alt={props.pair.symbolA}
              />

              {getReserves(props.pair.reserveA, props.pair.decimalsA)}
              <div className={'PoolExplorerItem_pair_margin_left'}>
                {props.pair.symbolA}
              </div>
            </div>
            <div className="poolExplorer__reserve">
              <img
                className="poolExplorer__icon"
                style={{ width: '32px', height: '32px' }}
                src={iconGenerator(props.pair.symbolB)}
                alt={props.pair.symbolB}
              />
              {getReserves(props.pair.reserveB, props.pair.decimalsB)}

              <div className={'PoolExplorerItem_pair_margin_left'}>
                {props.pair.symbolB}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default PoolExplorerItem;
