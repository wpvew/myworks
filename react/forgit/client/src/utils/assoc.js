export function assoc(key, value) {
  return (obj) => ({
    ...obj,
    [key]: value,
  });
}
