/**
 * Returns truncated number
 *
 * @param {number} num
 * @param {number} [decimals=4] - Numbers before truncate
 * @param {number} [informativeDecimals=1] - Numbers after zero
 * @returns {number}
 */
export default function truncateNum(
  num,
  decimals = 4,
  informativeDecimals = 1,
) {
  if (Number.isInteger(num)) return num;

  let truncatedNum = getFixedDown(num, decimals);

  while (Number.isInteger(truncatedNum)) {
    truncatedNum = getFixedDown(num, decimals);
    decimals++;
  }

  while (informativeDecimals > 1) {
    truncatedNum = getFixedDown(num, decimals);
    decimals++;
    informativeDecimals--;
  }

  return truncatedNum;
}

/**
 * Returns truncated number
 * Based on @kirilloid answer from https://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
 *
 * @param {number} num
 * @param {number} [digits=4]
 * @returns {number}
 */
function getFixedDown(num, digits) {
  const re = new RegExp('(\\d+\\.\\d{' + digits + '})(\\d)');
  const m = num.toString().match(re);
  return m ? parseFloat(m[1]) : num.valueOf();
}
