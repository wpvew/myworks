import { TAuthData } from '../shared/components/Authorization';
import { TClientData } from '../shared/components/Layout/Content/ClientList';

export type TServerResponse = {
  data: Record<string, any>,
  error: string
}

export class serverAPI {
  static async autorization(data: TAuthData) {
    const response = await fetch('http://localhost:4200/login', {
      method: 'POST',
      body: JSON.stringify({
        ...data
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    return await response.json();
  }
  static async createClient(data: TClientData, token: string) {
    const response = await fetch('http://localhost:4200/create', {
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
    const response = await fetch('http://localhost:4200/client-list', {
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async getClient(id: string, token: string) {
    const response = await fetch(`http://localhost:4200/client/${id}`, {
      method: 'GET',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  static async updateClient(id: string, data: TClientData, token: string) {
    const response = await fetch(`http://localhost:4200/update/${id}`, {
      method: 'PATCH',
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
  static async deleteClient(id: string, token: string) {
    const response = await fetch(`http://localhost:4200/delete/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
}
