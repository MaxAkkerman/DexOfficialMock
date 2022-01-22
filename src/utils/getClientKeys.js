import { NO_CONTEXT } from '@/constants/runtimeErrors';
import { decrypt } from '@/extensions/tonUtils';

const HD_PATH = "m/44'/396'/0'/0/0";
const SEED_PHRASE_WORD_COUNT = 12; //Mnemonic word count
const SEED_PHRASE_DICTIONARY_ENGLISH = 1; //Dictionary identifier

export default async function getClientKeys() {
  if (
    !this ||
    !this.context ||
    !this.context.tonClient ||
    !this.context.reduxStore
  )
    throw new Error(NO_CONTEXT);

  const state = this.context.reduxStore.getState();

  const { encryptedSeedPhrase, seedPhrasePassword } = state.enterSeedPhrase;

  const decrypted = await decrypt(encryptedSeedPhrase, seedPhrasePassword);

  const keys = await this.context.tonClient.crypto.mnemonic_derive_sign_keys({
    dictionary: SEED_PHRASE_DICTIONARY_ENGLISH,
    path: HD_PATH,
    phrase: decrypted.phrase,
    word_count: SEED_PHRASE_WORD_COUNT,
  });

  return keys;
}
