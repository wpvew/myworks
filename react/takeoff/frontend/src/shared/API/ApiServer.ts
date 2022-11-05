import { TAuthData } from '../components/Layout/Authorization';
import { TContact } from '../components/ClientFormContainer';
import { TError } from '../utils/ParseError';

// const AUTH_SERVER_URL = 'http://localhost:4000/api/auth';
// const CLIENTS_SERVER_URL = 'http://localhost:4000/api/clients';
const AUTH_SERVER_URL = 'https://crm-backend-messer.herokuapp.com/api/auth';
const CLIENTS_SERVER_URL = 'https://crm-backend-messer.herokuapp.com/api/clients';

export type TClientDataFromServer = {
  _id: string;
  surname: string;
  name: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
  contacts: TContact[];
};
export type TClientDataToServer = {
  // _id: string;
  surname: string;
  name: string;
  lastName: string;
  contacts: TContact[];
};

export type TServerResponseClientList = {
  payload: TClientDataFromServer[];
  error: TError;
};
export type TServerResponseClient = {
  payload: TClientDataFromServer;
  error: TError;
};
export type TServerResponseUser = {
  payload: { username: string; token: string; isAdmin: boolean };
  error: TError;
};

export class ApiServer {
  static async login(data: TAuthData) {
    const response = await fetch(`${AUTH_SERVER_URL}/login`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }
  static async authentication(token: string) {
    const response = await fetch(`${AUTH_SERVER_URL}/auth`, {
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async registration(data: TAuthData) {
    const response = await fetch(`${AUTH_SERVER_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }
  static async createClient(data: TClientDataToServer, token: string) {
    const response = await fetch(`${CLIENTS_SERVER_URL}/create`, {
      method: 'POST',
      body: JSON.stringify({
        ...data,
      }),
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async getClientList(token: string) {
    const response = await fetch(`${CLIENTS_SERVER_URL}`, {
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async getClient(id: string, token: string) {
    const response = await fetch(`${CLIENTS_SERVER_URL}/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async updateClient(_id: string, data: TClientDataToServer, token: string) {
    const response = await fetch(`${CLIENTS_SERVER_URL}/update`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...data,
        _id,
      }),
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async deleteClient(id: string, token: string) {
    const response = await fetch(`${CLIENTS_SERVER_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}
