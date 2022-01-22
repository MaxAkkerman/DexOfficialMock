import React from 'react';

import arrowBottom from '../../images/arrowBottom.svg';

function SelectTokenMenu(props) {
  return (
    <div
      onClick={() => props.handleTouchTokenModal2()}
      className="send_select_btn"
    >
      <div className="send_set_token">Select asset</div>
      <div className="send_arrow_bottom_wrapper nofilter">
        <img src={arrowBottom} alt={'arrow'} />
      </div>
    </div>
  );
}

export default SelectTokenMenu;
