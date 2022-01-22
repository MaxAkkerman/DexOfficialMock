import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import {
  AB_DIRECTION,
  LIMIT_ORDER_PRICE_DENOMINATOR,
} from '@/constants/runtimeVariables';
import { DEXClientContract } from '@/extensions/contracts/DEXClient';
import convertToSafeInt from '@/utils/convertToSafeInt';

export default async function makeLimitOrder({
  directionPair,
  pairAddr,
  price,
  qty,
}) {
  if (
    !this ||
    !this.context ||
    !this.context.tonClient ||
    !this.context.dexClientAddress ||
    !this.helperFunctions ||
    !this.helperFunctions.getPair ||
    !this.helperFunctions.getClientKeys ||
    !this.helperFunctions.getTokenRouterAddress ||
    !this.helperFunctions.getShardLimit ||
    !this.helperFunctions.getClientWallet
  )
    throw new Error(NO_CONTEXT);

  const dexClientKeyPair = await this.helperFunctions.getClientKeys();

  const clientAcc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const sounitV = await this.helperFunctions.getShardLimit();
  console.log('sounitV', sounitV);
  const pair = await this.helperFunctions.getPair(pairAddr);
  let response = null;
  try {
    if (directionPair === AB_DIRECTION) {
      const routerAddress = await this.helperFunctions.getTokenRouterAddress(
        pair.rootA,
      );
      const token = await this.helperFunctions.getClientWallet(pair.rootA);
      response = await clientAcc.run('makeLimitOrderA', {
        pairAddr,
        priceA: convertToSafeInt(price * LIMIT_ORDER_PRICE_DENOMINATOR),
        qtyA: convertToSafeInt(qty * 10 ** token.decimals),
        routerWalletA: routerAddress,
        souint: sounitV,
      });
    } else {
      const routerAddress = await this.helperFunctions.getTokenRouterAddress(
        pair.rootB,
      );
      const token = await this.helperFunctions.getClientWallet(pair.rootB);
      response = await clientAcc.run('makeLimitOrderB', {
        pairAddr,
        priceB: convertToSafeInt(price * LIMIT_ORDER_PRICE_DENOMINATOR),
        qtyB: convertToSafeInt(qty * 10 ** token.decimals),
        routerWalletB: routerAddress,
        souint: sounitV,
      });
    }

    return response.decoded.output;
  } catch (e) {
    console.log('eee', e);
    return e;
  }
}
