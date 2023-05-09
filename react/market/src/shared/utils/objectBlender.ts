export function objectBlender<O extends Record<K, { value: string }>, K extends keyof O>(
  obj: O
): Record<K, string> {
  return (Object.keys(obj) as Array<K>).reduce((newObj, key) => {
    return {
      ...newObj,
      [key]: obj[key].value,
    };
  }, {} as Record<K, string>);
}
