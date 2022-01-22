import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import arrowBack from '../../images/arrowBack.png';
import copybtn from '../../images/copybtn.svg';
import { copyToClipboard, handleCutAddress } from '../../reactUtils/reactUtils';
import BlockItem from '../AmountBlock/AmountBlock';
import MainBlock from '../MainBlock/MainBlock';

function KeysBlock() {
  const navigate = useNavigate();

  const encryptedSeedPhrase = useSelector(
    (state) => state.enterSeedPhrase.encryptedSeedPhrase,
  );
  const seedPhrasePassword = useSelector(
    (state) => state.enterSeedPhrase.seedPhrasePassword,
  );

  const [keys, setKeys] = useState({});

  function handleBack() {
    navigate('/wallet/settings');
  }

  return (
    <div className="container">
      <MainBlock
        smallTitle={false}
        content={
          <div>
            <div className="head_wrapper">
              {/*//TODO*/}
              <button className="arrow_back" onClick={() => handleBack(false)}>
                <img src={arrowBack} alt={'arrow'} />
              </button>
              <div className="left_block boldFont">Keys</div>
            </div>

            <BlockItem
              leftTitle={'Public key'}
              rightTopBlock={null}
              rightBottomBlock={
                <>
                  <div className={'send_copy_address'}>
                    <button
                      style={{ fontSize: '20px', width: '100%' }}
                      onClick={() => copyToClipboard(keys.public)}
                      className="btn wallet-btn"
                    >
                      Copy Public Key
                    </button>
                  </div>
                  <div className="copybtn_wrapper hidden">
                    <button
                      className="arrow_back"
                      onClick={() => copyToClipboard(keys.public)}
                    >
                      <img src={copybtn} alt={'arrow'} />
                    </button>
                  </div>
                </>
              }
              leftBlockBottom={
                <div className="receive_balance_block">
                  <div className="receive_balance">
                    {handleCutAddress(keys.public ? keys.public : '')}
                  </div>
                </div>
              }
            />
            <BlockItem
              leftTitle={'Private key'}
              rightTopBlock={null}
              rightBottomBlock={
                <>
                  <div className={'send_copy_address'}>
                    <button
                      style={{ fontSize: '20px', width: '100%' }}
                      onClick={() => copyToClipboard(keys.secret)}
                      className="btn wallet-btn"
                    >
                      Copy Private Key
                    </button>
                  </div>
                  <div className="copybtn_wrapper hidden">
                    <button
                      className="arrow_back"
                      onClick={() => copyToClipboard(keys.secret)}
                    >
                      <img src={copybtn} alt={'arrow'} />
                    </button>
                  </div>
                </>
              }
              leftBlockBottom={
                <div className="receive_balance_block">
                  <div className="receive_balance">
                    {handleCutAddress(keys.secret ? keys.secret : '')}
                  </div>
                </div>
              }
            />
          </div>
        }
      />
    </div>
  );
}

export default KeysBlock;
