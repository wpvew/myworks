const ApiError = require("./ApiError");

/**
 * Преобразует входные данные в JSON объект
 * @param {Object} payload - Данные с сервера
 * @param {String} error - Ошибки
 * @returns {String} JSON объект
 */
function response(payload = null, error = new ApiError()) {
  return JSON.stringify({
    payload,
    error,
  });
}

module.exports = response;
