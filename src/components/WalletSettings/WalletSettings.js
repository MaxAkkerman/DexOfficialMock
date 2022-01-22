import './WalletSettings.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import MainBlock from '../../components/MainBlock/MainBlock';
import arrowBack from '../../images/arrowBack.png';
import { showRevealSeedPhrase } from '../../store/actions/enterSeedPhrase';

function WalletSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seedPhrasePassword = useSelector(
    (state) => state.enterSeedPhrase.seedPhrasePassword,
  );

  function handleBack() {
    navigate('/wallet');
  }

  function handlePushToKeys() {
    navigate('/wallet/settings/keys');
  }

  async function openRevealSeedPhrase() {
    /**
     * Handle reveal seed phrase
     */
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
              <div className="left_block boldFont">Settings</div>
            </div>
            <div className="bottomBtnsWrapper">
              <div className="btn_wrapper full_width">
                <button
                  className="btn wallet-btn full-width"
                  onClick={() => openRevealSeedPhrase()}
                  style={{ boxShadow: '0px 14px 44px rgba(69, 88, 255, 0.23)' }}
                >
                  Reveal Seed Phrase
                </button>
              </div>
              <div className="btn_wrapper full_width">
                <button
                  className="btn wallet-btn full-width"
                  onClick={() => handlePushToKeys()}
                  style={{ boxShadow: '0px 14px 44px rgba(69, 88, 255, 0.23)' }}
                >
                  Public & Private Keys
                </button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default WalletSettings;
