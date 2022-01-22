import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { LIMIT_ORDER_PRICE_DENOMINATOR } from '@/constants/runtimeVariables';
import { DEXClientContract } from '@/extensions/contracts/DEXClientMainNet';
import convertToSafeInt from '@/utils/convertToSafeInt';

export default async function updateLimitOrderPrice({ addrOrder, newPrice }) {
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

  const clientAcc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const response = await clientAcc.run('changeLimitOrderPrice', {
    limitOrder: addrOrder,
    newPrice: convertToSafeInt(newPrice * LIMIT_ORDER_PRICE_DENOMINATOR),
  });

  return response.decoded.output;
}
