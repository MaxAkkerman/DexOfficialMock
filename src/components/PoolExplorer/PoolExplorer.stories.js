import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';

import rootReducer from '../../store/reducers';
import PoolExplorer from './PoolExplorer';

export default {
  component: PoolExplorer,
  decorators: [(story) => <BrowserRouter>{story()}</BrowserRouter>],
  title: 'Pages/Pool Explorer',
};

// eslint-disable-next-line react/prop-types
const Template = (store, args) => (
  <Provider store={store}>
    <PoolExplorer {...args} />
  </Provider>
);

export const WithoutWallet = Template.bind({}, createStore(rootReducer));

export const WithoutPairs = Template.bind(
  {},
  createStore(rootReducer, {
    appReducer: { walletIsConnected: true },
    walletReducer: {
      pairsList: [],
    },
  }),
);
export const WithThreePairs = Template.bind(
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
          symbolB: 'USDT',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'WTON',
          totalSupply: '10999999',
        },
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
          symbolA: 'DAI',
          symbolB: 'WBTC',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'USDT',
          totalSupply: '10999999',
        },
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
          symbolA: 'USDT',
          symbolB: 'USDC',
          totalSupply: '10999999',
        },
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
          symbolB: 'WETH',
          totalSupply: '10999999',
        },
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
          symbolB: 'BNB',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'BNB',
          totalSupply: '10999999',
        },
      ],
    },
  }),
);
export const WithPairs = Template.bind(
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
          symbolB: 'USDT',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'WTON',
          totalSupply: '10999999',
        },
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
          symbolA: 'DAI',
          symbolB: 'WBTC',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'USDT',
          totalSupply: '10999999',
        },
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
          symbolA: 'USDT',
          symbolB: 'USDC',
          totalSupply: '10999999',
        },
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
          symbolB: 'WETH',
          totalSupply: '10999999',
        },
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
          symbolB: 'BNB',
          totalSupply: '10999999',
        },
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
          symbolA: 'WBTC',
          symbolB: 'BNB',
          totalSupply: '10999999',
        },
      ],
    },
  }),
);
