import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setAmountForSend } from '../../store/actions/walletSeed';

function InputChange(props) {
  const dispatch = useDispatch();

  function handleChangeAmount(e) {
    console.log('i am on inp change');
    props.changeAmout ? props.changeAmout(e) : dispatch(setAmountForSend(e));
  }
  function handleKeyPress(event) {
    if (event.key === '-' || event.key === '+') {
      event.preventDefault();
    }
  }
  const amountToSend = useSelector(
    (state) => state.walletSeedReducer.amountToSend,
  );
  const inputNFTdisabled = useSelector(
    (state) => state.walletSeedReducer.inputNFTdisabled,
  );

  return (
    <div className="send_inputs">
      <input
        type="number"
        min={0}
        onChange={(e) => handleChangeAmount(e.currentTarget.value)}
        onKeyPress={(event) => handleKeyPress(event)}
        value={props.amount ? props.amount : amountToSend}
        className="amount_input"
        placeholder={'0'}
        disabled={inputNFTdisabled}
        // max={props.currentToken.balance}
      />
    </div>
  );
}

export default InputChange;
