import './index.scss';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CloseBtn from '@/components-v2/CloseBtn';
import MainBlock from '@/components-v2/MainBlock';
import chrome from '@/images/icons/chrome.svg';
import { hideChromePopup } from '@/store/actions/chromePopup';

export default function ChromePopup() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.chromePopup.visible);

  if (!visible) return null;

  function handleClose() {
    localStorage.setItem('chrome', true);
    dispatch(hideChromePopup());
  }

  return (
    <div className="popup-wrapper">
      <MainBlock
        smallTitle={true}
        button={<CloseBtn onClick={handleClose} />}
        content={
          <div className="popup-content">
            <>
              <img width={86} height={86} src={chrome} alt="Chrome logo" />
              <p className="popup-title">
                Please use the desktop version of Google Chrome for{' '}
                <a className="popup-link">trade.defispace.com</a>
              </p>
              <button className="btn popup-btn" onClick={handleClose}>
                Okay, i understand
              </button>
              <a
                target="_blank"
                href={`https://www.google.com/intl/en_us/chrome/`}
                className="popup-link"
                rel="noreferrer"
              >
                Download Google Chrome
              </a>
            </>
          </div>
        }
      />
    </div>
  );
}
