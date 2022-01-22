import { SnackbarProvider } from 'notistack';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Alert from '@/components-v2/Alert';
import LimitOrderConfirmPopup from '@/components-v2/LimitOrderConfirmPopup';
import { pairs, tokens } from '@/constants/mocks';
import rootReducer from '@/store/reducers';

export default {
  component: LimitOrderConfirmPopup,
  title: 'Popup/Limit order confirm (redux, notistack)',
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
      <LimitOrderConfirmPopup {...args} />
    </SnackbarProvider>
  </Provider>
);

export const WithoutValues = Template.bind(
  {},
  createStore(rootReducer, {
    limitOrderReducer: {
      values: null,
    },
  }),
);

export const WithValues = Template.bind(
  {},
  createStore(rootReducer, {
    limitOrderReducer: {
      values: {
        fromToken: tokens.WTON,
        fromValue: 14,
        pair: pairs.WTON_DAI,
        toPrice: 5,
        toToken: tokens.DAI,
        toValue: 14 * 5,
      },
    },
  }),
);
