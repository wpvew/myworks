import { ApiError } from './ApiError.js';

export function makeClientFromData(data) {
  const errors = [];

  function asString(v) {
    return (v && String(v).trim()) || '';
  }

  const client = {
    name: asString(data.name),
    surname: asString(data.surname),
    lastName: asString(data.lastName),
    contacts: Array.isArray(data.contacts)
      ? data.contacts.map((contact) => ({
          field: asString(contact.field),
          value: asString(contact.value),
          type: asString(contact.type),
        }))
      : [],
  };

  if (!client.name) errors.push({ field: 'name', message: 'Name is require' });
  if (!client.surname) errors.push({ field: 'surname', message: 'Surname is require' });
  if (client.contacts.some((contact) => !contact.type || !contact.value || !contact.field))
    errors.push({ field: 'contacts', message: 'You need to fill all contacts' });

  if (errors.length) throw new ApiError(422, errors);

  return client;
}
