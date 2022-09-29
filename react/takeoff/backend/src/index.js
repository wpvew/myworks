/* eslint-disable @typescript-eslint/no-var-requires */
const { existsSync, readFileSync, writeFileSync } = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { response, getQueryParams } = require('./utils.js');

const PORT = process.env.PORT || 4200;
const DB_FILE = process.env.DB_FILE || './public/db.json';

const AUTH_DATA = Object.freeze({
  login: 'admin',
  password: 'admin',
  token: 'ZGV2ZWxvcGVyOnNraWxsYm94',
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

class ApiError extends Error {
  constructor(statusCode, data) {
    super();
    this.statusCode = statusCode;
    this.data = data;
  }
}

function authCheck(req, res, next) {
  if (req.headers.authorization !== `Basic ${AUTH_DATA.token}`) {
    res.end(response(null, 'Unauthorized'));
    return;
  }
  next();
}

/**
 * Проверяет входные данные и создаёт из них корректный объект клиента
 * @param {Object} data - Объект с входными данными
 * @throws {ApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ name: string, surname: string, lastName: string, contacts: object[] }} Объект клиента
 */
function makeClientFromData(data) {
  const errors = [];

  function asString(v) {
    return (v && String(v).trim()) || '';
  }

  // составляем объект, где есть только необходимые поля
  const client = {
    name: asString(data.name),
    surname: asString(data.surname),
    lastName: asString(data.lastName),
    contacts: Array.isArray(data.contacts)
      ? data.contacts.map((contact) => ({
          type: asString(contact.type),
          name: asString(contact.name),
          value: asString(contact.value),
        }))
      : [],
  };
  // проверяем, все ли данные корректные и заполняем объект ошибок, которые нужно отдать клиенту
  if (!client.name) errors.push({ field: 'name', message: 'Не указано имя' });
  if (!client.surname) errors.push({ field: 'surname', message: 'Не указана фамилия' });
  if (client.contacts.some((contact) => !contact.type || !contact.name || !contact.value))
    errors.push({ field: 'contacts', message: 'Не все добавленные контакты полностью заполнены' });

  // если есть ошибки, то бросаем объект ошибки с их списком и 422 статусом
  if (errors.length) throw new ApiError(422, { errors });

  return client;
}

/**
 * Возвращает список клиентов из базы данных
 * @param {{ search: string }} [params] - Поисковая строка
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[] }[]} Массив клиентов
 */
function getClientList(params = {}) {
  const clients = JSON.parse(readFileSync(DB_FILE) || '[]');
  if (params.search) {
    const search = params.search.trim().toLowerCase();
    return clients.filter((client) =>
      [
        client.name,
        client.surname,
        client.lastName,
        ...client.contacts.map(({ value }) => value),
      ].some((str) => str.toLowerCase().includes(search))
    );
  }
  return clients;
}

/**
 * Создаёт и сохраняет клиента в базу данных
 * @throws {ApiError} Некорректные данные в аргументе, клиент не создан (statusCode 422)
 * @param {Object} data - Данные из тела запроса
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function createClient(data) {
  const newItem = makeClientFromData(data);
  newItem.id = Date.now().toString();
  newItem.createdAt = newItem.updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify([...getClientList(), newItem]), { encoding: 'utf8' });
  return newItem;
}

/**
 * Возвращает объект клиента по его ID
 * @param {string} itemId - ID клиента
 * @throws {ApiError} Клиент с таким ID не найден (statusCode 404)
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function getClient(itemId) {
  const client = getClientList().find(({ id }) => id === itemId);
  if (!client) throw new ApiError(404, { message: 'Client Not Found' });
  return client;
}

/**
 * Изменяет клиента с указанным ID и сохраняет изменения в базу данных
 * @param {string} itemId - ID изменяемого клиента
 * @param {{ name?: string, surname?: string, lastName?: string, contacts?: object[] }} data - Объект с изменяемыми данными
 * @throws {ApiError} Клиент с таким ID не найден (statusCode 404)
 * @throws {ApiError} Некорректные данные в аргументе (statusCode 422)
 * @returns {{ id: string, name: string, surname: string, lastName: string, contacts: object[], createdAt: string, updatedAt: string }} Объект клиента
 */
function updateClient(itemId, data) {
  const clients = getClientList();
  const itemIndex = clients.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: 'Client Not Found' });
  Object.assign(clients[itemIndex], makeClientFromData({ ...clients[itemIndex], ...data }));
  clients[itemIndex].updatedAt = new Date().toISOString();
  writeFileSync(DB_FILE, JSON.stringify(clients), { encoding: 'utf8' });
  return clients[itemIndex];
}

/**
 * Удаляет клиента из базы данных
 * @param {string} itemId - ID клиента
 * @returns {{}}
 */
function deleteClient(itemId) {
  const clients = getClientList();
  const itemIndex = clients.findIndex(({ id }) => id === itemId);
  if (itemIndex === -1) throw new ApiError(404, { message: 'Client Not Found' });
  clients.splice(itemIndex, 1);
  writeFileSync(DB_FILE, JSON.stringify(clients), { encoding: 'utf8' });
  return {};
}

// создаём новый файл с базой данных, если он не существует
if (!existsSync(DB_FILE)) writeFileSync(DB_FILE, '[]', { encoding: 'utf8' });

app.post('/login', (req, res) => {
  const { login, password } = req.body || {};
  if (login === AUTH_DATA.login) {
    if (password === AUTH_DATA.password) {
      res.end(response({ token: AUTH_DATA.token }));
    } else {
      res.end(response(null, 'Invalid password'));
    }
    return;
  }

  res.end(response(null, 'No such user'));
});

app.post('/create', authCheck, (req, res) => {
  res.end(response(createClient(req.body)));
});

app.get('/client/:id', authCheck, (req, res) => {
  res.end(response(getClient(req.params.id)));
});

app.get('/client-list', authCheck, (req, res) => {
  res.end(response(getClientList(getQueryParams(req, '/client-list'))));
});

app.patch('/update/:id', authCheck, (req, res) => {
  const id = req.params.id;
  const data = req.body;
  res.end(response(updateClient(id, data)));
});

app.delete('/delete/:id', authCheck, (req, res) => {
  res.end(response(deleteClient(req.params.id)));
});

app.listen(PORT, () => {
  console.log(`Backend app listening at http://localhost:${PORT}`);
});
