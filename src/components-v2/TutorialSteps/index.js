import { Steps } from 'intro.js-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

import { steps as stepsData } from '@/constants/defaultData';
import { finishTutorial } from '@/store/actions/tutorial';

export default function TutorialSteps() {
  const visible = useSelector((state) => state.chromePopup.visible);
  const { enabled, handleNextStep, handleOnExit, initialStep, steps } =
    useTutorial();

  if (visible) return null;

  return (
    <Steps
      enabled={enabled}
      steps={steps}
      initialStep={initialStep}
      onChange={handleNextStep}
      onExit={handleOnExit}
      options={{
        tooltipClass: 'Tooltip',
      }}
    />
  );
}

function useTutorial() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const finished = useSelector((state) => state.tutorialReducer.finished);
  const clientData = useSelector((state) => state.walletReducer.clientData);
  const [, setStorage] = useLocalStorage('tutorialFinished');

  const [enabled, setEnabled] = useState(!finished);
  const [initialStep, setInitialStep] = useState(0);
  const [steps, setSteps] = useState(stepsData);

  useEffect(() => {
    if (!finished) {
      setEnabled(true);
      setStorage(false);
    }
  }, [finished]);

  useEffect(() => {
    if (clientData && clientData.status) setSteps(stepsData.slice(0, -3));
  }, [clientData]);

  function handleNextStep(nextIdx) {
    if (nextIdx === 7) {
      setEnabled(false);
      navigate('/account');
      setInitialStep(7);
      setEnabled(true);
    }
  }

  function handleOnExit() {
    setEnabled(false);
    setStorage(true);
    dispatch(finishTutorial());
  }

  return {
    enabled,
    handleNextStep,
    handleOnExit,
    initialStep,
    steps,
  };
}
