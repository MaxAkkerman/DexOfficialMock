import { Account } from '@tonclient/appkit';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXPairContract } from '@/extensions/contracts/DEXPair';
import { DEXRootContract } from '@/extensions/contracts/DEXRoot';
import { RootTokenContract } from '@/extensions/contracts/RootTokenContract';
import { getReplacedSymbol } from '@/extensions/sdk_get/get';
import { getFixedNums, hex2a } from '@/reactUtils/reactUtils';

/**
 * @returns {Promise<{
 * pairAddress: string
 * symbolA: string
 * reserveA: string
 * decimalsA: number
 * symbolB: string,
 * reserveB: number
 * decimalsB: number
 * decimalsAB: number
 * rateAB: number
 * rateBA: number
 * totalSupply: number
 * aRoot: string
 * bRoot: string
 * }[]>} pairs
 */
export default async function getAllPairsWithoutProvider() {
  if (
    !this ||
    !this.context ||
    !this.context.dexRootAddress ||
    !this.context.tonClient ||
    !this.helperFunctions ||
    !this.helperFunctions.getPairsTotalSupply ||
    !this.helperFunctions.checkClientPairExists ||
    !this.helperFunctions.checkWalletExists
  )
    throw new Error(NO_CONTEXT);

  const acc = new Account(DEXRootContract, {
    address: this.context.dexRootAddress,
    client: this.context.tonClient,
  });

  const response = await acc.runLocal('pairs', {});
  console.log('response.decoded.output', response.decoded.output);
  let normlizeWallets = [];

  for (const [addrPair, { root0, root1, rootLP }] of Object.entries(
    response.decoded.output.pairs,
  )) {
    const curRootTokenA = new Account(RootTokenContract, {
      address: root0,
      client: this.context.tonClient,
    });
    const curRootTokenB = new Account(RootTokenContract, {
      address: root1,
      client: this.context.tonClient,
    });
    const curRootTokenAB = new Account(RootTokenContract, {
      address: rootLP,
      client: this.context.tonClient,
    });
    const pairContract = new Account(DEXPairContract, {
      address: addrPair,
      client: this.context.tonClient,
    });

    let bal = await pairContract.runLocal('balanceReserve', {});

    let curRootDataA = await curRootTokenA.runLocal('getDetails', {
      _answer_id: 0,
    });
    let curRootDataB = await curRootTokenB.runLocal('getDetails', {
      _answer_id: 0,
    });
    let curRootDataAB = await curRootTokenAB.runLocal('getDetails', {
      _answer_id: 0,
    });
    const decimalsRootA = Number(curRootDataA.decoded.output.value0.decimals);
    const decimalsRootB = Number(curRootDataB.decoded.output.value0.decimals);
    const decimalsRootAB = Number(curRootDataAB.decoded.output.value0.decimals);

    const balanceA = Number(bal.decoded.output.balanceReserve[root0] || 0);
    const balanceB = Number(bal.decoded.output.balanceReserve[root1] || 0);

    const fixedA = getFixedNums(decimalsRootA, balanceA);
    const fixedB = getFixedNums(decimalsRootB, balanceB);
    // console.log("fixedA", fixedA, "fixedB", fixedB);
    let itemData = {};
    itemData.pairAddress = addrPair;
    // itemData.pairname = hex2a(curRootDataAB.decoded.output.value0.name)
    // itemData.symbolA = hex2a(curRootDataA.decoded.output.value0.symbol);
    itemData.symbolA = getReplacedSymbol(
      hex2a(curRootDataA.decoded.output.value0.symbol),
    );
    // hex2a(curRootDataA.decoded.output.value0.symbol) === 'WTON'
    //   ? 'EVER'
    //   : hex2a(curRootDataA.decoded.output.value0.symbol);

    itemData.reserveA = balanceA;
    itemData.decimalsA = decimalsRootA;
    itemData.symbolB = getReplacedSymbol(
      hex2a(curRootDataB.decoded.output.value0.symbol),
    );
    // hex2a(curRootDataB.decoded.output.value0.symbol) === 'WTON'
    //   ? 'EVER'
    //   : hex2a(curRootDataB.decoded.output.value0.symbol);

    // itemData.symbolB = hex2a(curRootDataB.decoded.output.value0.symbol);
    itemData.reserveB = balanceB;
    itemData.decimalsB = decimalsRootB;

    itemData.decimalsAB = decimalsRootAB;

    itemData.rateAB = fixedB / fixedA || 0;
    itemData.rateBA = fixedA / fixedB || 0;
    itemData.totalSupply = await this.helperFunctions.getPairsTotalSupply(
      addrPair,
    );

    if (
      itemData.pairAddress !==
      '0:ea784f5e3434beb91fa56c8b0131cac0be703d6551a3bb297e4d6db95ae0af8e'
    ) {
      console.log('alert', itemData.symbolA);
      normlizeWallets.push(itemData);
    }

    // let wrongPairID = normlizeWallets.find((item,i)=>{
    // 	if(item.pairAddress === "0:ea784f5e3434beb91fa56c8b0131cac0be703d6551a3bb297e4d6db95ae0af8e")
    // 	{
    // 		return i
    // 	}
    //
    // })
    // console.log("wrongPairID",wrongPairID)
    // if(wrongPairID){
    // 	normlizeWallets.splice(wrongPairID,1)
    // }
    itemData.rootA = root0;
    itemData.rootB = root1;

    itemData.exists = await this.helperFunctions.checkClientPairExists(
      itemData.pairAddress,
    );
    itemData.walletExists = await this.helperFunctions.checkWalletExists(
      itemData.pairAddress,
    );

    console.log('normlizeWallets!!normlizeWallets', normlizeWallets);
  }

  return normlizeWallets;
}
