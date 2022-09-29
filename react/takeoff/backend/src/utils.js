module.exports = {
  response,
  getQueryParams,
};

/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
function response(data = null, error = '') {
  return JSON.stringify({
    data,
    error,
  });
}

function getQueryParams(req, prefix) {
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
