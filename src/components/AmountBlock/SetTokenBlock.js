import React from 'react';

import arrowBottomBl from '../../images/arrowBottomBl.svg';

function SetTokenBlock(props) {
  console.log('pro', props);
  return (
    <div
      onClick={
        props.handleTouchTokenModal ? () => props.handleTouchTokenModal() : null
      }
      className="send_change_token"
    >
      <div className="send_img_wrapper">
        <img
          className="send_token_img"
          src={props.currentToken.icon}
          alt={'arrow'}
        />
      </div>
      <div className="send_img_wrapper">
        <div className="send_token_symbol">{props.currentToken.symbol}</div>
        {props.disableArrow && props.disableArrow ? null : (
          <div className="send_arrow_bottom_wrapper">
            <img className="add_width" src={arrowBottomBl} alt={'arrow'} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SetTokenBlock;
