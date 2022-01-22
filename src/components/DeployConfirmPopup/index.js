import './index.scss';

import constant from 'lodash/constant';
import times from 'lodash/times';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PinPopup from '@/components/LoginViaPIN/PinPopup';
import { deployClient } from '@/extensions/sdk_run/run';
import { decrypt, decryptPure } from '@/extensions/tonUtils';
import { saveLog } from '@/logging/logging';
import { InitializeClient } from '@/reactUtils/reactUtils';
import { hideDeployPopup } from '@/store/actions/deployPopup';
import {
  resetWaitingPopupValues,
  setWaitingPopupValues,
} from '@/store/actions/waitingPopup';
import { getClientBalance } from '@/extensions/sdk_get/get';

export default function DeployConfirmPopup() {
  const dispatch = useDispatch();
  const [pin, setPin] = useState(times(4, constant('')));

  const visible = useSelector((state) => state.deployPopup.visible);
  const clientData = useSelector((state) => state.walletReducer.clientData);

  const { enqueueSnackbar } = useSnackbar();

  function resetPin() {
    setPin(times(4, constant('')));
  }

  async function handleDeploy({ complete }) {
    if (!complete) {
      enqueueSnackbar({
        message: 'Please, complete PIN',
        type: 'error',
      });
      return;
    }

    let seedPhrasePassword = '';
    pin.map((v) => {
      seedPhrasePassword += v;
    });
    let esp = localStorage.getItem('esp');

    let decrypted = await decrypt(esp, seedPhrasePassword);
    if (!decrypted.valid) {
      resetPin();
      enqueueSnackbar({
        message: `Wrong PIN, please try again`,
        type: 'error',
      });
      return;
    }

    try {
      const balance = await getClientBalance(clientData.address);
      if (balance < 1) throw new Error('Insufficient balance');
    } catch {
      enqueueSnackbar({
        message: 'Need at least 1 EVER',
        type: 'error',
      });
      resetPin();
      dispatch(hideDeployPopup());
      return;
    }

    dispatch(hideDeployPopup());
    dispatch(
      setWaitingPopupValues({
        hidable: false,
        text: 'Deploying a new wallet',
        title: 'Sending message to blockchain',
      }),
    );

    const clientPrepData = JSON.parse(
      localStorage.getItem('clientDataPreDeploy'),
    );
    const encClData = await decryptPure(
      clientPrepData.secret,
      seedPhrasePassword,
    );
    clientPrepData.secret = encClData;
    const deployRes = await deployClient(clientPrepData);
    if (deployRes.code) {
      enqueueSnackbar({
        message: `Something goes wrong - error code ${deployRes.code}`,
        type: 'error',
      });
    } else {
      saveLog(
        {
          clientAddress: clientPrepData.address,
          created_at: (Date.now() + 10800000) / 1000,
          name: 'deployNewClient',
        },
        'deployNewClient',
      );
      await InitializeClient(clientPrepData.public);
      localStorage.removeItem('clientDataPreDeploy');
      enqueueSnackbar({
        message: 'Your wallet successfully deployed',
        type: 'success',
      });
    }

    dispatch(resetWaitingPopupValues());
  }

  function handleClose() {
    dispatch(hideDeployPopup());
  }

  if (!visible) return null;

  return (
    <PinPopup
      title="Enter your PIN"
      showTwoBtns
      handleClickBack={handleClose}
      btnText="Log in"
      pin={pin}
      onSetPin={setPin}
      handleClickNext={handleDeploy}
    />
  );
}
