import './AssetsListForDeploy.scss';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AssetsList from '../../components/AssetsList/AssetsList';
import MainBlock from '../../components/MainBlock/MainBlock';
import { connectToPairStep2DeployWallets } from '../../extensions/sdk_run/run';
import useKeyPair from '../../hooks/useKeyPair';
import arrowBack from '../../images/arrowBack.png';
import nativeBtn from '../../images/nativeadd.svg';
import { setTips } from '../../store/actions/app';
import DeployAssetConfirmPopup from '../DeployAssetConfirmPopup/DeployAssetConfirmPopup';
import DeployCustomTokenPopup from '../DeployCustomTokenPopup/DeployCustomTokenPopup';
import SearchInput from '../SearchInput/SearchInput';
import WaitingPopup from '../WaitingPopup/WaitingPopup';

function AssetsListForDeploy() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const clientData = useSelector((state) => state.walletReducer.clientData);
  const assetsFromGraphQL = useSelector(
    (state) => state.walletReducer.assetsFromGraphQL,
  );
  const tokens = useSelector((state) => state.tonData.tokens);

  const { keyPair } = useKeyPair();

  const [curAssetForDeploy, setcurAssetForDeploy] = useState({});
  const [showAssetDepPopup, showConfirmAssetDeployPopup] = useState(false);

  const [deployWalletIsWaiting, setdeployWalletIsWaiting] = useState(false);
  const [showDeployCustomWalletPopup, setshowDeployCustomWalletPopup] =
    useState(false);

  const [filter, setFilter] = useState('');

  function handleSetCustomAddrPopup() {
    setshowDeployCustomWalletPopup(true);
  }

  function handleSetAssetForDeploy(item) {
    let x = tokens.filter(it=>it.rootAddress === item.rootAddress)
    console.log("xxx",x)
    if(x.length){
      dispatch(
          setTips({
            message: `You already have a ${item.symbol} wallet`,
            type: 'error',
          }),
      );

    }else{
      showConfirmAssetDeployPopup(true);
      setcurAssetForDeploy(item);
    }


  }

  function hideConfirm() {
    showConfirmAssetDeployPopup(false);
  }

  function handleSearch(text) {
    setFilter(text);
  }

  async function handleDeployAsset() {


    if (clientData.balance < 4) {
      dispatch(
        setTips({
          message: `You need at least 4 EVERs on balance to deploy ${curAssetForDeploy.tokenName} wallet`,
          type: 'error',
        }),
      );
      return;
    }

    showConfirmAssetDeployPopup(false);
    setdeployWalletIsWaiting(true);

    const curPair = { rootA: curAssetForDeploy.rootAddress };

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
    setdeployWalletIsWaiting(false);
  }

  function handleClose() {
    setdeployWalletIsWaiting(false);
  }

  function handleBack() {
    navigate('/wallet');
  }

  return (
    <>
      {showDeployCustomWalletPopup && (
        <DeployCustomTokenPopup
          handleShow={() => setshowDeployCustomWalletPopup(false)}
        />
      )}
      {showAssetDepPopup && (
        <DeployAssetConfirmPopup
          handleDeployAsset={() => handleDeployAsset()}
          currentAsset={curAssetForDeploy}
          hideConfirmPopup={() => hideConfirm()}
        />
      )}
      <div className="container">
        {deployWalletIsWaiting && (
          <WaitingPopup
            text={`Deploying ${curAssetForDeploy.tokenName}`}
            handleClose={() => handleClose()}
          />
        )}
        {!deployWalletIsWaiting && !showDeployCustomWalletPopup ? (
          <MainBlock
            class={'heightfixmainBlock'}
            smallTitle={false}
            // title={'Assets'}
            content={
              <div>
                <div className="head_wrapper" style={{ marginBottom: '40px' }}>
                  <button className="arrow_back" onClick={() => handleBack()}>
                    <img src={arrowBack} alt={'arrow'} />
                  </button>
                  <div className="left_block boldFont">Assets Inspector</div>
                  <button
                    className={'settings_btn'}
                    onClick={() => handleSetCustomAddrPopup()}
                  >
                    <img src={nativeBtn} alt={'native'} />
                  </button>
                </div>

                <SearchInput func={(e) => handleSearch(e)} />
                {assetsFromGraphQL.length ? (
                  <AssetsList
                    assetWrap="heightfixWrap assetsList_off_padding"
                    TokenAssetsArray={assetsFromGraphQL.filter((i) =>
                      i.symbol.includes(filter.toUpperCase()),
                    )}
                    NFTassetsArray={null}
                    isAssetsInspector={true}
                    handleClickNFT={() => console.log('token item')}
                    // showNFTdata={showNFTdata}
                    handleClickToken={(item) => handleSetAssetForDeploy(item)}
                  />
                ) : null}
              </div>
            }
          />
        ) : null}
      </div>
    </>
  );
}

export default AssetsListForDeploy;
