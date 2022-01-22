export default function includesTextInToken(token, text) {
  console.log('token, text', token, text);
  return token.symbol
    ? token.symbol.toLowerCase().includes(text.toLowerCase())
    : token.tokenName.toLowerCase().includes(text.toLowerCase());
}
