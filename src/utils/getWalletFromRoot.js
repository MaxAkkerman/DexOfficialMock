import { Account } from '@tonclient/appkit';

import { FUNC_FAIL, NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClient';

/**
 * Get the wallet address (token) from the DEX client using the root address (token)
 * @param {string} dexClientAddr - The address of the DEX client
 * @param {string} tokenRootAddr - The root address of the token
 * @returns {Promise<string>} walletAddress - The wallet address (token) that corresponds to the root address (token)
 */
export default async function getWalletFromRoot(dexClientAddr, tokenRootAddr) {
  if (!this || !this.context || !this.context.tonClient)
    throw new Error(NO_CONTEXT);

  const clientAcc = new Account(DEXClientContract, {
    address: dexClientAddr,
    client: this.context.tonClient,
  });

  const res = await clientAcc.runLocal('rootWallet', {});
  if (!res.decoded) throw new Error(FUNC_FAIL);

  const { rootWallet } = res.decoded.output;

  return rootWallet[tokenRootAddr];
}
