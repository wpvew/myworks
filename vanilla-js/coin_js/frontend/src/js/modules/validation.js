export function validRestiction(str, type) {
  if (type === 'cash') {
    str = str
      .replace(/[^.\d]/g, '')
      .replace(/^\./, '')
      .replace(/\.{2,}/, '.');
    if (str.includes('.')) {
      return str.split('.')[0] + '.' + str.split('.')[1].slice(0, 2);
    }
    return str;
  } else if (type === 'numeric') {
    return str.replace(/[^\d]/g, '');
  }
}
