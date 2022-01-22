import { FormHelperText } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MainBlock from '../../components/MainBlock/MainBlock';
import { getDetailsFromTokenRoot } from '../../extensions/sdk_get/get';
import { connectToPairStep2DeployWallets } from '../../extensions/sdk_run/run';
import useKeyPair from '../../hooks/useKeyPair';
import arrowBack from '../../images/arrowBack.png';
import { hex2a } from '../../reactUtils/reactUtils';
import WaitingPopup from '../WaitingPopup/WaitingPopup';
function DeployCustomTokenPopup(props) {
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const [showWaitingDeployCustomPopup, setshowWaitingDeployCustomPopup] =
    useState(false);
  const [addressValidation, setAddressValidation] = useState({});
  const [addrRoot, setRootAddress] = useState(null);
  const [addressToSendView, setaddressToSendView] = useState(null);
  const [rootData, setRootData] = useState(null);

  const { keyPair } = useKeyPair();

  useEffect(async () => {
    if (addrRoot === null) return;
    const res = await getDetailsFromTokenRoot(addrRoot);
    if (res.code) {
      setAddressValidation({
        isInvalid: true,
        validationMsg: 'Invalid address',
      });
    } else {
      setAddressValidation({
        isInvalid: false,
        validationMsg: 'Invalid address',
      });
      setRootAddress(addrRoot);
      handleSetView(addrRoot);
      setRootData(res);
    }
  }, [addrRoot]);

  function handleChangeAddress(e) {
    setRootAddress(e.currentTarget.value);
  }

  function handleBack() {
    props.handleShow();
  }

  async function handleDeployCustom() {
    // if (clientData.balance < 4) return;

    setshowWaitingDeployCustomPopup(true);
    const curPair = { rootA: addrRoot };
    const deployData = {
      curPair,
      clientAdr: clientData.address,
      clientRoots: '',
    };

    const deployRes = await connectToPairStep2DeployWallets(
      deployData,
      keyPair,
    );
    console.log('deployRes', deployRes);
    setshowWaitingDeployCustomPopup(false);
    setRootAddress(null);
    setaddressToSendView(null);
    props.handleShow();
  }

  function handleSetView() {
    let spliced = addrRoot.slice(0, 7);
    let splicedpart2 = addrRoot.slice(59);
    let view = spliced + '...' + splicedpart2;
    setaddressToSendView(view);
  }

  function handleClearInput() {
    setaddressToSendView('');
    // dispatch(setAddressForSend(""));
  }

  function handleClose() {
    props.handleShow();
  }

  return (
    <div className="container">
      {!showWaitingDeployCustomPopup && (
        <MainBlock
          smallTitle={false}
          content={
            <div>
              <div className="head_wrapper">
                <button
                  className="arrow_back"
                  onClick={() => handleBack(false)}
                >
                  <img src={arrowBack} alt={'arrow'} />
                </button>
                <div className="left_block boldFont">
                  Deploy from custom root
                </div>
              </div>
              <div
                className={cls('recipient_wrapper', {
                  amount_wrapper_error: addressValidation.isInvalid,
                  amount_wrapper_success: !addressValidation.isInvalid,
                })}
              >
                <div className="send_text_headers">Recipient address</div>
                <div>
                  <div className="send_inputs">
                    <input
                      onChange={(e) => handleChangeAddress(e)}
                      value={addressToSendView ? addressToSendView : addrRoot}
                      className="recipient_input"
                      placeholder={'0:...'}
                    />

                    <CloseIcon
                      // style=
                      fontSize="medium"
                      onClick={() => handleClearInput('address')}
                    />
                  </div>
                </div>
              </div>
              {addressValidation.isInvalid && (
                <FormHelperText
                  style={{ marginLeft: '27px', marginTop: '4px' }}
                  error
                  id="component-error-text"
                >
                  {addressValidation.validationMsg}
                </FormHelperText>
              )}
              <div
                style={{ width: '100%', marginTop: '20px', marginLeft: '20px' }}
              >
                <div className="send_text_headers">Deploy Fee ~ 4 EVERs</div>
                {rootData && (
                  <div className="DeployAssetConfirmPopup__data">
                    Root symbol{' '}
                    {rootData ? hex2a(rootData.symbol) : 'undefined'}
                  </div>
                )}
              </div>

              <div className="btn_wrapper ">
                <button
                  onClick={() => handleDeployCustom(true)}
                  className={`btn mainblock-btn`}
                >
                  Confirm deploy
                </button>
              </div>
            </div>
          }
        />
      )}

      {showWaitingDeployCustomPopup && (
        <WaitingPopup
          text={`Deploying ${hex2a(rootData.symbol)}`}
          handleClose={() => handleClose()}
        />
      )}
    </div>
  );
}

export default DeployCustomTokenPopup;
