/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class ApiError extends Error {
  constructor(statusCode = 0, data = null) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

module.exports = ApiError;
