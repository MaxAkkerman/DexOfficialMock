import { MockedProvider } from '@apollo/client/testing';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Alert from '@/components-v2/Alert';
import SwapConfirmPopup from '@/components-v2/SwapConfirmPopup';
import { pairs, tokens } from '@/constants/mocks';
import rootReducer from '@/store/reducers';

export default {
  component: SwapConfirmPopup,
  title: 'Popup/Swap confirm (redux, apollo, notistack)',
};

const Template = (store, args) => (
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={10000}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom',
      }}
      content={(key, { message, type }) => (
        <Alert id={key} message={message} type={type} />
      )}
    >
      <MockedProvider>
        <SwapConfirmPopup {...args} />
      </MockedProvider>
    </SnackbarProvider>
  </Provider>
);

export const WithoutValues = Template.bind(
  {},
  createStore(rootReducer, {
    swapReducer: {
      values: null,
    },
  }),
);

export const WithValues = Template.bind(
  {},
  createStore(rootReducer, {
    swapReducer: {
      values: {
        fromToken: tokens.WTON,
        fromValue: 14,
        pair: pairs.WTON_DAI,
        slippage: 0,
        toToken: tokens.DAI,
        toValue: 14 * pairs.WTON_DAI.rateAB,
      },
    },
  }),
);
