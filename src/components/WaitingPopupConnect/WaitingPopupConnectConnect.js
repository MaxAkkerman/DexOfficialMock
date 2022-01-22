import './WaitingPopupConnect.scss';

import React from 'react';
import { useDispatch } from 'react-redux';

import { setSwapAsyncIsWaiting } from '../../store/actions/swap';
import Loader from '../Loader/Loader';
import MainBlock from '../MainBlock/MainBlock';

function WaitingPopupConnect(props) {
  const dispatch = useDispatch();
  return (
    // <div className="popup-wrapper">
    <MainBlock
      content={
        <div className="popup-content">
          <Loader />
          <p className="popup-loading-text">Sending message to blockchain</p>
          {props.text && (
            <p className="popup-loading-text popup-loading-descr">
              {props.text}
            </p>
          )}
          <button className="btn popup-btn" onClick={() => props.handleClose()}>
            Hide
          </button>
        </div>
      }
    />
    // </div>
  );
}

export default WaitingPopupConnect;
