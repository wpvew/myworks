import { TClientDataMod } from '../components/ClientFormContainer';
import { TRegData } from '../components/Layout/Registration';
import { ParseError } from './ParseError';

export function makeClientFromForm(data: TClientDataMod) {
  return {
    surname: data.surname.value,
    name: data.name.value,
    lastName: data.lastName.value,
    contacts: data.contacts,
  };
}

export const makeUserFromRegData = (data: TRegData) => {
  const errors = { message: '' };
  const user = {
    username: data.username.value,
    password: data.password.value,
  };

  if (
    [data.username.value, data.password.value, data.repeatPassword.value]
      .map((item) => item.length)
      .some((item) => item <= 0)
  )
    errors.message = 'all fields are required';
  if (data.password.value !== data.repeatPassword.value) errors.message = 'passwords dont match';

  if (errors.message) throw new ParseError(401, errors.message);
  return user;
};
