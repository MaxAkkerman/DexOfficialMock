import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClientMainNet';

export default async function cancelLimitOrder(addrOrder) {
  if (
    !this ||
    !this.context ||
    !this.context.tonClient ||
    !this.context.dexClientAddress ||
    !this.helperFunctions ||
    !this.helperFunctions.getClientKeys
  )
    throw new Error(NO_CONTEXT);

  const dexClientKeyPair = await this.helperFunctions.getClientKeys();

  const acc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const response = await acc.run('cancelLimitOrder', {
    limitOrder: addrOrder,
  });

  return response.decoded.output;
}
