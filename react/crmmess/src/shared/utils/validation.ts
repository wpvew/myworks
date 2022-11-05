/* eslint-disable no-useless-escape */
export const validationLogin = (str: string) => {
  return str.replace(/[^a-zA-Z0-9]-/g, '');
};
export const validationNumber = (str: string) => {
  return str.replace(/[^0-9+]/g, '');
};
export const validationString = (str: string) => {
  return str.replace(/[^a-zA-ZА-я-]/g, '');
};
export const validationEmail = (str: string) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(str);
};

export const validationContact = (field: string, value: string) => {
  if (field === 'phone') return value.replace(/[^\d.]/g, '').length === 11;
  if (field === 'email') return validationEmail(value);
  return value.length > 2;
};
