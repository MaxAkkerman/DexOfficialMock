import { Account } from '@tonclient/appkit';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClient';
import { DEXPairContract } from '@/extensions/contracts/DEXPair';

/**
 * Function to check wallet exists by pair
 * @author   max_akkerman
 * @param   {string} pairAddress
 * @param pairAddress
 * @return   [{walletAddress:string,symbol:string,balance:number}]
 */
export default async function checkWalletExists(pairAddress) {
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
  const pairContract = new Account(DEXPairContract, {
    address: pairAddress,
    client: this.context.tonClient,
  });
  try {
    const respRootWallets = await acc.runLocal('rootWallet', {});

    const respRootA = await pairContract.runLocal('rootA', {});
    const respRootB = await pairContract.runLocal('rootB', {});
    const respRootAB = await pairContract.runLocal('rootAB', {});

    let clientRoots = respRootWallets.decoded.output.rootWallet;
    let rootA = respRootA.decoded.output.rootA;
    let rootB = respRootB.decoded.output.rootB;
    let rootAB = respRootAB.decoded.output.rootAB;

    let checkedArr = [
      {
        status: !!clientRoots[rootA],
        walletAaddress: rootA,
      },
      {
        status: !!clientRoots[rootB],
        walletBaddress: rootB,
      },
      {
        status: !!clientRoots[rootAB],
        walletABaddress: rootAB,
      },
    ];

    console.log('checkedObj', checkedArr);
    return checkedArr;
    // let newArr = clientPairs.filter(item => item === pairAddress);
    // return newArr.length !== 0;
  } catch (e) {
    console.log('catch E', e);

    return [
      {
        status: false,
        walletAaddress: 0,
      },
      {
        status: false,
        walletBaddress: 0,
      },
      {
        status: false,
        walletABaddress: 0,
      },
    ];
  }
}
