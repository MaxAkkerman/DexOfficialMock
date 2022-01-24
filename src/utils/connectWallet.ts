import { NO_CONTEXT } from "../constants/runtimeErrors";
import { setClientData } from "../store/actions/wallet";
import { setWalletIsConnected } from "../store/actions/app";
import { FunctionsContext } from "../types";

export default async function connectWallet(
  this: FunctionsContext,
): Promise<boolean> {
  if (!this || !this.context || !this.context.reduxStore)
    throw new Error(NO_CONTEXT);

  this.context.reduxStore.dispatch(
    setClientData({
      balance: 48.494226114,
      dexclient:
        "0:e6cd868e34a0558171483682b2dcbb19f0cc1ba8c13aef97c8c2c862b93d2094",
      public:
        "35366f1aabb1186793eb827757b04d1ef8d881fcc15a2de5ff4cb0d28e3ffda1",
      status: true,
    }),
  );
  this.context.reduxStore.dispatch(setWalletIsConnected(true));

  return true;
}
