import { Account } from '@tonclient/appkit';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { LimitOrderRootContract } from '@/extensions/contracts/LimitOrderRoot';
import { getShardThis } from '@/extensions/tonUtils';

export default async function getShardLimit() {
  if (
    !this ||
    !this.context ||
    !this.context.dexRootAddress ||
    !this.context.limitRootAddress ||
    !this.context.tonClient
  )
    throw new Error(NO_CONTEXT);

  let response;
  let targetShard = getShardThis(this.context.dexRootAddress);
  const rootAcc = new Account(LimitOrderRootContract, {
    address: this.context.limitRootAddress,
    client: this.context.tonClient,
  });

  const souintInitial = await rootAcc.runLocal('_deployedNumber', {});
  console.log('souintInitial', souintInitial);

  let souint = parseInt(souintInitial.decoded.output._deployedNumber, 16);
  console.log('souint', souint);

  // let souint = 0;
  let curShard = null;

  while (curShard !== targetShard) {
    response = await rootAcc.runLocal('resolveOrder', { id: souint });
    console.log('shards', targetShard, curShard);

    curShard = response.decoded.output.addrOrder[2];
    console.log('shards', targetShard, curShard);
    souint++;
  }
  return souint;
}
