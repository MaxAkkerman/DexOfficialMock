import truncateNum from './truncateNum';

test('fn(0) should return 0', () => {
  expect(truncateNum(0)).toBe(0);
});

test('fn(23) should return 23', () => {
  expect(truncateNum(23)).toBe(23);
});

test('fn(29.2332838) should return 29.2332', () => {
  expect(truncateNum(29.2332838)).toBe(29.2332);
});

test('fn(29.2332838, 5) should return 29.23328', () => {
  expect(truncateNum(29.2332838, 5)).toBe(29.23328);
});

test('fn(0.000007) should return 0.000007', () => {
  expect(truncateNum(0.000007)).toBe(0.000007);
});

test('fn(1.000007) should return 1.000007', () => {
  expect(truncateNum(1.000007)).toBe(1.000007);
});

test('fn(0.00000732) should return 0.000007', () => {
  expect(truncateNum(0.00000732)).toBe(0.000007);
});

test('fn(1.00000189, 4) should return 1.000001', () => {
  expect(truncateNum(1.00000189)).toBe(1.000001);
});

test('fn(1.00000189, 4, 2) should return 1.0000018', () => {
  expect(truncateNum(1.00000189, 4, 2)).toBe(1.0000018);
});
