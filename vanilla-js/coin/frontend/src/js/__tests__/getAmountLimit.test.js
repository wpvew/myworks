import { AccountDetailsViewAccount } from '../modules/AccountDetails.js';

test('Проверка ближайшего верхнего круглого числа', () => {
  const testElem = new AccountDetailsViewAccount();
  expect(testElem.geyAmountLimit(5124512)).toBe(5200000);
  expect(testElem.geyAmountLimit(982)).toBe(990);
});
