import './WaitingPopup.scss';

import React from 'react';

import Loader from '../Loader/Loader';
import MainBlock from '../MainBlock/MainBlock';

function WaitingPopup(props) {
  return (
    <div className="popup-wrapper">
      <MainBlock
        content={
          <div className="popup-content">
            <Loader />
            <p className="popup-loading-text">
              {props.title ? props.title : 'Sending message to blockchain'}
            </p>
            {props.text && (
              <p className="popup-loading-text popup-loading-descr">
                {props.text}
              </p>
            )}
            {!props.hide && (
              <button
                className="btn popup-btn"
                onClick={() => props.handleClose()}
              >
                Hide
              </button>
            )}
          </div>
        }
      />
    </div>
  );
}

export default WaitingPopup;
