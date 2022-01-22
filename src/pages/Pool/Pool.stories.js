import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import rootReducer from '../../store/reducers';
import ProvideLiquidity from './Pool';

export default {
  component: ProvideLiquidity,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
  title: 'Pages/Provide Liquidity Page',
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
  <Provider store={store}>
    <ProvideLiquidity {...args} />
  </Provider>
);

export const WithoutWallet = Template.bind({}, createStore(rootReducer));

export const WithoutPairs = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    walletReducer: {
      liquidityList: [],
    },
  }),
);

export const WithPairsAndTokens = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    walletReducer: {
      pairsList: [
        {
          exists: true,
          pairAddress:
            '0:50c00629f4a36672608b441c6e5bc3809be782e3bf1faad4e32e18ad0f4c0bdb',
          rateAB: 0.007000000001909091,
          rateBA: 142.8571428181818,
          reserveA: 1571428571,
          reserveB: 11000000,
          rootA:
            '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
          rootB:
            '0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef',
          symbolA: 'WTON',
          symbolB: 'DAI',
          totalSupply: '10999999',
        },
        {
          exists: true,
          pairAddress:
            '0:5c0e22237dce402a4d26573eec1b83f647bd7ad9ba27f93d9684bcf7780f7030',
          rateAB: 0.22326236363636365,
          rateBA: 4.4790352646661935,
          reserveA: 5500000000,
          reserveB: 1227943000,
          rootA:
            '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
          rootB:
            '0:1ad0575f0f98f87a07ec505c39839cb9766c70a11dadbfc171f59b2818759819',
          symbolA: 'WTON',
          symbolB: 'USDC',
          totalSupply: '1500000',
        },
      ],
      tokenList: [
        {
          balance: 18.371355611,
          decimals: '9',
          icon: 'https://trade.defispace.com/06f491487328de8e7fd81d835cfda442.svg',
          owner_address:
            '0:5b3b1c2a86941cdb30b925f711034bf3f4430d15d02a696e9242e1a7fcebaba8',
          rootAddress:
            '0:0ee39330eddb680ce731cd6a443c71d9069db06d149a9bec9569d1eb8d04eb37',
          symbol: 'WTON',
          tokenName: 'Wrapped TON Crystal',
          type: 'PureToken',
          walletAddress:
            '0:53489672a1e951f2c1c3c14676a3d5b80031844daf97df6ea355f2e66ebaf731',
        },
        {
          balance: 57.922748,
          decimals: '6',
          icon: 'https://trade.defispace.com/0de21bf496e8428f05bf28029caa4965.svg',
          owner_address:
            '0:533d4ec07d8e610c2cce9e755f90ab75898f46a67c0daa860fb3bfd1774134b1',
          rootAddress:
            '0:751b6e22687891bdc1706c8d91bf77281237f7453d27dc3106c640ec165a2abf',
          symbol: 'USDT',
          tokenName: 'Tether',
          type: 'PureToken',
          walletAddress:
            '0:5eeeba02539217ed8bca327ac23cb3b2da26b51e84df8d842c94a8b2d690f21b',
        },
        {
          balance: 0.289999999989,
          decimals: '18',
          icon: 'https://trade.defispace.com/b73b696693dcd144056b89329a461e9b.svg',
          owner_address:
            '0:5ed9bef6272079ce03e48469f315bccb50fc61de3cfa4a34e1c69992b30b8e2c',
          rootAddress:
            '0:95934aa6a66cb3eb211a80e99234dfbba6329cfa31600ce3c2b070d8d9677cef',
          symbol: 'DAI',
          tokenName: 'DAI',
          type: 'PureToken',
          walletAddress:
            '0:51b5475f23d185f860d21b91fad2b885d410e90f903ab0866576500ef9c0ad7b',
        },
      ],
    },
  }),
);
