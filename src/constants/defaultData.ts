import TON from '../images/tokens/TONold.svg';
import wBTC from '../images/tokens/wBTC.svg';
import wETH from '../images/tokens/wETH.svg';

export const marks = [
  {
    value: 6,
    label: '6m',
    rate: 8,
  },
  {
    value: 9,
    // label: '9m',
    rate: 9.29,
  },
  {
    value: 12,
    label: '12m',
    rate: 10.57,
  },
  {
    value: 15,
    // label: '15m',
    rate: 11.86,
  },
  {
    value: 18,
    label: '18m',
    rate: 13.14,
  },
  {
    value: 21,
    // label: '21m',
    rate: 14.43,
  },
  {
    value: 24,
    label: '24m',
    rate: 15.71,
  },
  {
    value: 27,
    // label: '27m',
    rate: 17,
  },
  {
    value: 30,
    label: '30m',
    rate: 18.29,
  },
  {
    value: 33,
    // label: '33m',
    rate: 19.57,
  },
  {
    value: 36,
    label: '36m',
    rate: 20.86,
  },
  {
    value: 39,
    // label: '39m',
    rate: 22.14,
  },
  {
    value: 42,
    label: '42m',
    rate: 23.43,
  },
  {
    value: 45,
    // label: '45m',
    rate: 24.71,
  },
  {
    value: 48,
    label: '48m',
    rate: 26,
  },
];

export const programs = [
  {
    name: 'On demand',
    period: 1 / 30,
    apy: 6,
    id: 0,
    info: 'Daily',
    disabledBtn: false,
    status: 'Calculate',
  },
  {
    name: 'Medium term',
    period: 12,
    apy: 10.57,
    id: 1,
    info: '12 months',
    disabledBtn: true,
    status: 'Coming soon',
  },
  {
    name: 'Long term',
    period: 48,
    apy: 26,
    id: 2,
    info: '48 months',
    disabledBtn: true,
    status: 'Coming soon',
  },
];

export const assetstestArray = [
  {
    tokenName: 'Ethereum',
    balance: '1002',
    tokenSymbol: 'ETH',
    icon: wETH,
    address:
      '0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f',
  },
  {
    tokenName: 'Everscale',
    balance: '1052',
    tokenSymbol: 'EVER',
    icon: TON,
    address:
      '0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f',
  },
  {
    tokenName: 'Bitcoin',
    balance: '102',
    tokenSymbol: 'BTC',
    icon: wBTC,
    address:
      '0:4594ac781bdcdee350c9c8c25dfaf08d067b1214fa86c687f4deca048a76551f',
  },
];

export const pincodeArray = [
  {
    id: 0,
    focused: true,
    value: '',
    error: false,
  },
  {
    id: 1,
    focused: false,
    value: '',
    error: false,
  },
  {
    id: 2,
    focused: false,
    value: '',
    error: false,
  },
  {
    id: 3,
    focused: false,
    value: '',
    error: false,
  },
];
export const numPadArr = [
  {
    value: 1,
  },
  {
    value: 2,
  },
  {
    value: 3,
  },
  {
    value: 4,
  },
  {
    value: 5,
  },
  {
    value: 6,
  },
  {
    value: 7,
  },
  {
    value: 8,
  },
  {
    value: 9,
  },
  {
    disabled: true,
    value: 10,
  },
  {
    value: 0,
  },
  {
    disabled: true,
    value: 12,
  },
];
export const InitialSeedState = [
  { id: 0, label: 'Word 1', seed: '', onSeedError: true },
  { id: 1, label: 'Word 2', seed: '', onSeedError: true },
  { id: 2, label: 'Word 3', seed: '', onSeedError: true },
  { id: 3, label: 'Word 4', seed: '', onSeedError: true },
  { id: 4, label: 'Word 5', seed: '', onSeedError: true },
  { id: 5, label: 'Word 6', seed: '', onSeedError: true },
  { id: 6, label: 'Word 7', seed: '', onSeedError: true },
  { id: 7, label: 'Word 8', seed: '', onSeedError: true },
  { id: 8, label: 'Word 9', seed: '', onSeedError: true },
  { id: 9, label: 'Word 10', seed: '', onSeedError: true },
  { id: 10, label: 'Word 11', seed: '', onSeedError: true },
  { id: 11, label: 'Word 12', seed: '', onSeedError: true },
];

export const onlyNums = /^[0-9\b]+$/;

export const steps = [
  {
    intro:
      'Welcome to DeFiSpace! Click “Next” to go through this tutorial and learn how to trade with ease and convenience.',
  },
  {
    element: '#nav-swap',
    intro:
      'Swap is the easiest way to swap assets on DeFiSpace AMM DEX. Once you connect to a pair and create all the necessary wallets it only takes 10 seconds to swap!',
  },
  {
    element: '#nav-limit-order',
    intro:
      'Limit orders can be used to create orders with specific price and volume, much like traditional exchanges.',
  },
  {
    element: '#nav-provide-liquidity',
    intro:
      'You can become a Liquidity Provider and earn profits with every swap other traders perform on DeFiSpace AMM DEX!',
  },
  {
    element: '#nav-pool-explorer',
    intro:
      'Pool Explorer allows you to observe the current AMM reserves on DeFiSpace.',
  },
  {
    element: '#nav-wallet',
    intro:
      'Assets menu is where you will see all your wallets and all your assets. You can also use it to send assets to other users inside the Everscale Network.',
  },
  {
    element: '#nav-stacking',
    intro:
      'Staking allows you to make your EVER coins work for you. You also get an NFT certificate for your stake that you can transfer, sell or use as a collateral for instant liquidity!',
  },
  {
    element: '#nav-bridge',
    intro:
      'Bridge allows you to easily and quickly transfer your assets from other chains to EVERSCALE blockchain. You can use Metamask and other wallets to transfer your tokens to DefiSpace wallet.',
  },
  {
    element: '#nav-farming',
    intro:
      ' Farming is coming soon to DefiSpace to allow Liquidity Providers to earn additional profits by putting their Liquidity Tokens into Farming pools.',
  },
  {
    element: '#nav-connect-wallet',
    intro: "First let's connect a wallet to start using DeFiSpace",
  },
  {
    element: '#nav-login-seed-phrase',
    intro:
      'If you already have a DeFiSpace wallet seed-phrase you probably know what to do.',
  },
  {
    element: '#nav-register-seed-phrase',
    intro: "If you're new to this, click here and follow the instructions.",
  },
];
