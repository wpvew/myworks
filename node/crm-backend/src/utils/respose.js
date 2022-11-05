export function response(payload = null, error = '') {
  return JSON.stringify({
    payload,
    error,
  });
}
