import values from 'lodash/values';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import LimitOrderPage from '@/components-v2/LimitOrderPage';
import { pairs, tokens } from '@/constants/mocks';
import rootReducer from '@/store/reducers';

export default {
  component: LimitOrderPage,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
  title: 'Pages/Create limit order (redux)',
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
  <Provider store={store}>
    <LimitOrderPage {...args} />
  </Provider>
);

export const WithoutWallet = Template.bind({}, createStore(rootReducer));

export const WithoutTokens = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    tonData: {
      pairs: values(pairs),
      tokens: [],
    },
  }),
);

export const WithoutPairs = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    tonData: {
      pairs: [],
      tokens: values(tokens),
    },
  }),
);

export const WithPairsAndTokens = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    tonData: {
      pairs: [],
      tokens: values(tokens),
    },
  }),
);
