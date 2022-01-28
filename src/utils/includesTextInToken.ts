export default function includesTextInToken<
  T extends { symbol: string; tokenName: string },
>(token: T, text: string) {
  console.log("token, text", token, text);
  return token.symbol
    ? token.symbol.toLowerCase().includes(text.toLowerCase())
    : token.tokenName.toLowerCase().includes(text.toLowerCase());
}
