import "./index.scss";

import React from "react";

import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";
import { resetWaitingPopupValues } from "../../store/actions/waitingPopup";
import Loader from "../Loader";
import MainBlock from "../MainBlock";

export default function WaitingPopup() {
  const dispatch = useAppDispatch();

  const values = useAppSelector((state) => state.waitingPopup.values);

  function onClose() {
    dispatch(resetWaitingPopupValues());
  }

  if (!values) return null;

  const { hidable, text, title } = values;

  return (
    <div className="popup-wrapper">
      <MainBlock
        content={
          <div className="popup-content">
            <Loader />
            <p className="popup-loading-text">
              {title || "Sending message to blockchain"}
            </p>
            {text && (
              <p className="popup-loading-text popup-loading-descr">{text}</p>
            )}
            {hidable && (
              <button className="btn popup-btn" onClick={onClose}>
                Hide
              </button>
            )}
          </div>
        }
      />
    </div>
  );
}
