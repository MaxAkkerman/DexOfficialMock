import find from 'lodash/find';

import { NO_CONTEXT } from '@/constants/runtimeErrors';

/**
 * @typedef {Object} Wallet
 * @property {boolean} status
 * @property {string} walletAddress
 */

/**
 * @typedef {Object} Pair
 * @property {string} pairAddress
 * @property {string} symbolA
 * @property {number} reserveA
 * @property {number} decimalsA
 * @property {string} symbolB
 * @property {number} reserveB
 * @property {number} decimalsB
 * @property {number} rateAB
 * @property {number} rateBA
 * @property {number} totalSupply
 * @property {string} rootA
 * @property {string} rootB
 * @property {boolean} exists
 * @property {Wallet[]} walletExists
 */

/**
 * Find a pair by the pair's address
 * @param {string} pairAddress - The address of the pair
 * @returns {Pair} pair
 */
export default function getPair(pairAddress) {
  if (!this || !this.context || !this.context.reduxStore)
    throw new Error(NO_CONTEXT);

  const state = this.context.reduxStore.getState();

  return find(state.tonData.pairs, { pairAddress });
}
