const ApiError = require('../../utils/ApiError');

/**
 * Создает экземпляр обработанного объекта
 */
class MakeSupplyFromData {
  /**
   * Создание объекта
   * @param {Object} data - Объект с входными данными
   */
  constructor(data) {
    this.data = {
      fk_r1022_p00: this.asString(data.fk_r1022_p00),
      npp: this.asNumber(data.npp),
      naim_org: this.asString(data.naim_org),
      adr_fact: this.asString(data.adr_fact),
      inn: this.asString(data.inn),
      plazma_max: this.asNumber(data.plazma_max),
      plazma_cena: this.asNumber(data.plazma_cena),
      erm_max: this.asNumber(data.erm_max),
      erm_cena: this.asNumber(data.erm_cena),
      immg_max: this.asNumber(data.immg_max),
      immg_cena: this.asNumber(data.immg_cena),
      alb_max: this.asNumber(data.alb_max),
      alb_cena: this.asNumber(data.alb_cena),
    };
  }

  /**
   * Преобразует свойства объекта в тип String и удаляет пробелы или возвращает пуствую строку
   * @param {any} v - значение свойства объекта
   * @return {String}
   */
  asString(v) {
    this.asString = this.asString.bind(this);
    return v && String(v).trim() || '';
  }

  /**
   * Преобразует свойства объекта в тип String и заменяет , на . или возвращает '0'
   * @param {any} v - значение свойства объекта
   * @return {String}
   */
  asNumber(v) {
    this.asNumber = this.asNumber.bind(this);
    return v && String(v.replace(',', '.')) || '0';
  }
}

/**
 * Создает экземпляр обработанного объекта и проверяет на наличие входные данные
 * @extends MakeSupplyFromData
 */
class MakeSupplyFromDataWithError extends MakeSupplyFromData {
  /**
   * Создание объекта
   * @param {Object} data - Объект с входными данными
   */
  constructor(data) {
    super(data);
    this.errors = [];
    this.getErrors();
  }

  /**
   * Проверяет на наличие входные данные
   * @throws {ApiError} Некорректные данные в аргументе (statusCode 422)
   */
  getErrors() {
    if (!this.data.naim_org) this.errors.push({ field: 'naim_org', message: 'Наименование не указано' });
    if (!this.data.adr_fact) this.errors.push({ field: 'adr_fact', message: 'Местонахождение не указано' });
    if (!this.data.inn) this.errors.push({ field: 'inn', message: 'ИНН не указан' });
    if (this.errors.length) throw new ApiError(422, { errors: this.errors });
  }
}

module.exports = {
  MakeSupplyFromData,
  MakeSupplyFromDataWithError,
};
