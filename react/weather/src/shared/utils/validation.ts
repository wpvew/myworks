export function validationString(str: string) {
  return str.replace(/[^a-z0-9- ]+$/i, '');
}
