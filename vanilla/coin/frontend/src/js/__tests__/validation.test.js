import { validRestiction } from '../modules/validation';

test('Проверка номера счета и суммы должна пропускать корректные значения', () => {
  expect(validRestiction('12.s34.4123', 'cash')).toBe('12.34');
  expect(validRestiction('12512312', 'cash')).toBe('12512312');
  expect(validRestiction('12531.21', 'cash')).toBe('12531.21');
  expect(validRestiction('125asd31s1', 'cash')).toBe('125311');
  expect(validRestiction('33124121', 'numeric')).toBe('33124121');
  expect(validRestiction('g.s.,e', 'numeric')).toBe('');
  expect(validRestiction('g1.s.512,e', 'numeric')).toBe('1512');
});
