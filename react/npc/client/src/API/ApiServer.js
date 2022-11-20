import axios from 'axios';

const getDatabase = () => {
  if (process.env.REACT_APP_DB === 'local') return 'http://localhost:5500/api';
  return 'https://postgres-kris.herokuapp.com/api';
};

const DB_URL = getDatabase();

export class ApiServer {
  static async getSubjects() {
    return await axios.get(`${DB_URL}/subjects`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async getSupplyBloodTable(id) {
    return await axios.post(`${DB_URL}/supply_blood/get`, {
      id,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async create(data) {
    return await axios.post(`${DB_URL}/supply_blood/create`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async getSupplyRow(data) {
    return await axios.post(`${DB_URL}/supply_blood/get_row`, {
      ...data,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async update(data) {
    return await axios.patch(`${DB_URL}/supply_blood`, data, { headers: { 'Content-Type': 'application/json' } });
  }
  static async delete(id) {
    return await axios.delete(`${DB_URL}/supply_blood`, {
      data: {
        id,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
