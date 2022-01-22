/**
 * Convert (scientific/plain) number (with/without) decimals to a long integer
 * @param {number} unsafeNum - Number which can be in decimals or in scientific notation
 * @return {string} safeNum - Integer in a full width
 */
export default function convertToSafeInt(unsafeNum) {
  return BigInt(Math.round(unsafeNum)).toString();
}
