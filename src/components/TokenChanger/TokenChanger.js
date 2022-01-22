import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TON from '../../images/tokens/TONold.svg';
import { setTokenForReceiveSetted } from '../../store/actions/walletSeed';
import SelectTokenMenu from '../AmountBlock/SelectTokenMenu';
import SetTokenBlock from '../AmountBlock/SetTokenBlock';

function TokenChanger(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tokenForReceiveSetted = useSelector(
    (state) => state.walletSeedReducer.tokenForReceiveSetted,
  );
  const currentTokenForReceive = useSelector(
    (state) => state.walletSeedReducer.currentTokenForReceive,
  );

  function handleTouchTokenModal() {
    navigate('/wallet/receive/receive-modal');
  }

  function handleTouchTokenModal2() {
    dispatch(setTokenForReceiveSetted(true));
    navigate('/wallet/receive/receive-modal');
  }

  return (
    <>
      {tokenForReceiveSetted ? (
        <>
          <div className="send_set_token_wrap">
            {props.enableMax}
            <SetTokenBlock
              handleTouchTokenModal={() => handleTouchTokenModal()}
              img={TON}
              currentToken={currentTokenForReceive}
            />
          </div>
        </>
      ) : (
        <div className="send_select_wrap">
          <SelectTokenMenu
            handleTouchTokenModal2={() => handleTouchTokenModal2()}
          />
        </div>
      )}
    </>
  );
}

export default TokenChanger;
