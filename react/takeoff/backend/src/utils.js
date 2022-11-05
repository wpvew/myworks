// module.exports = {
//   response,
//   getQueryParams,
// };

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
export function response(payload = null, error = '') {
  return JSON.stringify({
    payload,
    error,
  });
}

export function getQueryParams(req, prefix) {
  const query = req.url.substr(prefix.length).split('?')[1];
  const queryParams = {};
  if (query) {
    for (const piece of query.split('&')) {
      const [key, value] = piece.split('=');
      queryParams[key] = value ? decodeURIComponent(value) : '';
    }
  }
  return queryParams;
}
