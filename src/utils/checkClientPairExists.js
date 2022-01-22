import { Account } from '@tonclient/appkit';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClient';

/**
 * Function to check connected pair or not
 * @author   max_akkerman
 * @param   {string} pairAddress
 * @param pairAddress
 * @return   {bool}
 */
export default async function checkClientPairExists(pairAddress) {
  if (
    !this ||
    !this.context ||
    !this.context.dexClientAddress ||
    !this.context.tonClient
  )
    throw new Error(NO_CONTEXT);

  const acc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
  });
  try {
    const response = await acc.runLocal('getAllDataPreparation', {});
    const response2 = await acc.runLocal('rootWallet', {});
    let clientPairs = response.decoded.output.pairKeysR;
    console.log('getAllDataPreparation1', response.decoded.output);
    console.log('getAllDataPreparation2', response2.decoded.output);
    let newArr = clientPairs.filter((item) => item === pairAddress);
    return newArr.length !== 0;
  } catch (e) {
    console.log('catch E', e);
    return false;
  }
}
