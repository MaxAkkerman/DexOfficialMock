import { Account } from '@tonclient/appkit';
import invert from 'lodash/invert';

import { FUNC_FAIL, NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClient';

/**
 * Get the root address (token) from the DEX client using the the wallet address (token)
 * @param {string} dexClientAddr - The address of the DEX client
 * @param {string} walletAddress - The wallet address of the token
 * @returns {Promise<string>} tokenRootAddr - The the root address (token) that corresponds to wallet address (token)
 */
export default async function getRootFromWallet(dexClientAddr, walletAddress) {
  if (!this || !this.context || !this.context.tonClient)
    throw new Error(NO_CONTEXT);

  const clientAcc = new Account(DEXClientContract, {
    address: dexClientAddr,
    client: this.context.tonClient,
  });

  const res = await clientAcc.runLocal('rootWallet', {});
  if (!res.decoded) throw new Error(FUNC_FAIL);

  const { rootWallet } = res.decoded.output;
  const iRootWallet = invert(rootWallet);

  return iRootWallet[walletAddress];
}
