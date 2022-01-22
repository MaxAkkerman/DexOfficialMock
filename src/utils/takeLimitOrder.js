import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { AB_DIRECTION } from '@/constants/runtimeVariables';
import { DEXClientContract } from '@/extensions/contracts/DEXClientMainNet';
import convertToSafeInt from '@/utils/convertToSafeInt';

export default async function takeLimitOrder({
  directionPair,
  orderAddr,
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
    !this.helperFunctions.getTokenRouterAddress
  )
    throw new Error(NO_CONTEXT);

  console.log(
    'takeLimitOrder->params',
    `${pairAddr},${orderAddr},${directionPair},${qty},${price}`,
  );

  const dexClientKeyPair = await this.helperFunctions.getClientKeys();

  const clientAcc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const pair = await this.helperFunctions.getPair(pairAddr);
  try {
    if (directionPair === AB_DIRECTION) {
      const routerAddr = await this.helperFunctions.getTokenRouterAddress(
        pair.rootB,
      );
      console.log('Router_address->B', routerAddr);
      const res = await clientAcc.run('takeLimitOrderA', {
        limitOrderA: orderAddr,
        pairAddr,
        priceB: convertToSafeInt(price),
        qtyB: convertToSafeInt(qty),
        routerWalletB: routerAddr,
      });
      console.log('takeLimitOrderA->response', res.decoded);
      res.decoded;
    } else {
      const routerAddr = await this.helperFunctions.getTokenRouterAddress(
        pair.rootA,
      );
      console.log('Router_address->A', routerAddr);
      const res = await clientAcc.run('takeLimitOrderB', {
        limitOrderB: orderAddr,
        pairAddr,
        priceA: convertToSafeInt(price),
        qtyA: convertToSafeInt(qty),
        routerWalletA: routerAddr,
      });
      console.log('takeLimitOrderB->response', res.decoded);
      return res.decoded;
    }

    return true;
  } catch (err) {
    console.log('takeLimitOrder->error', err);
    throw err;
  }
}
