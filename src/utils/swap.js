import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { AB_DIRECTION } from '@/constants/runtimeVariables';
import { DEXClientContract } from '@/extensions/contracts/DEXClientMainNet';
import convertToSafeInt from '@/utils/convertToSafeInt';

export default async function swap({
  directionPair,
  pairAddr,
  qtyFrom,
  qtyTo,
  slippage,
}) {
  if (
    !this ||
    !this.context ||
    !this.context.dexClientAddress ||
    !this.context.tonClient ||
    !this.helperFunctions ||
    !this.helperFunctions.getPair ||
    !this.helperFunctions.getClientWallet ||
    !this.helperFunctions.getClientKeys
  )
    throw new Error(NO_CONTEXT);

  const dexClientKeyPair = await this.helperFunctions.getClientKeys();

  const clientAcc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const pair = await this.helperFunctions.getPair(pairAddr);
  const tokenA = await this.helperFunctions.getClientWallet(pair.rootA);
  const tokenB = await this.helperFunctions.getClientWallet(pair.rootB);

  const minTo = qtyTo - (qtyTo * slippage) / 100;
  const maxTo = qtyTo + (qtyTo * slippage) / 100;

  try {
    let res = null;
    if (directionPair === AB_DIRECTION)
      res = await clientAcc.run('processSwapA', {
        maxQtyB: convertToSafeInt(maxTo * 10 ** tokenB.decimals),
        minQtyB: convertToSafeInt(minTo * 10 ** tokenB.decimals),
        pairAddr: pairAddr,
        qtyA: convertToSafeInt(qtyFrom * 10 ** tokenA.decimals),
      });
    else
      res = await clientAcc.run('processSwapB', {
        maxQtyA: convertToSafeInt(maxTo * 10 ** tokenA.decimals),
        minQtyA: convertToSafeInt(minTo * 10 ** tokenA.decimals),
        pairAddr: pairAddr,
        qtyB: convertToSafeInt(qtyFrom * 10 ** tokenB.decimals),
      });

    return res.decoded.output;
  } catch (e) {
    console.log('eee', e);
    return e;
  }
}
