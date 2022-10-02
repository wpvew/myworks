export const validationNumber = (str: string) => {
  return str.replace(/[^.\d]+/g, '');
};
