/**
 * Класс ошибки, используется для отправки ответа с определённым кодом и описанием ошибки
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ApiError;
