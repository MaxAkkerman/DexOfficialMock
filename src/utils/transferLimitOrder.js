import { Account } from '@tonclient/appkit';
import { signerKeys } from '@tonclient/core';

import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { DEXClientContract } from '@/extensions/contracts/DEXClientMainNet';

export default async function transferLimitOrder({
  addrOrder,
  newOwnerAddress,
  walletOwnerFrom,
  walletOwnerTo,
}) {
  if (
    !this ||
    !this.context ||
    !this.context.tonClient ||
    !this.context.dexClientAddress ||
    !this.helperFunctions ||
    !this.helperFunctions.getClientKeys ||
    !this.helperFunctions.getWalletFromRoot ||
    !this.helperFunctions.getRootFromWallet
  )
    throw new Error(NO_CONTEXT);

  const dexClientKeyPair = await this.helperFunctions.getClientKeys();

  const clientAcc = new Account(DEXClientContract, {
    address: this.context.dexClientAddress,
    client: this.context.tonClient,
    signer: signerKeys(dexClientKeyPair),
  });

  const rootFrom = await this.helperFunctions.getRootFromWallet(
    this.context.dexClientAddress,
    walletOwnerFrom,
  );
  const rootTo = await this.helperFunctions.getRootFromWallet(
    this.context.dexClientAddress,
    walletOwnerTo,
  );
  const walletNewOwnerFrom = await this.helperFunctions.getWalletFromRoot(
    newOwnerAddress,
    rootFrom,
  );
  const walletNewOwnerTo = await this.helperFunctions.getWalletFromRoot(
    newOwnerAddress,
    rootTo,
  );

  const response = await clientAcc.run('transferLimitOrder', {
    addrNewOwner: newOwnerAddress,
    limitOrder: addrOrder,
    walletNewOwnerFrom,
    walletNewOwnerTo,
  });

  return response.decoded.output;
}
