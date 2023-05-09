import axios from 'axios';
import { TLoginData } from '../pages/Auth';
import { TCompanyField, TEmployeeField } from '../pages/Register';
import { TCreatedEmployeerData, TEmploeerField } from '../pages/Employeers/CreateEmployeer';
import { IEmployeeData } from '../store/slice/emplyeeSlice';
import { TProductData } from '../hooks/useProductCardData';
import { TProductStockList } from '../pages/Warehouse';

export type TAxiosResponse<T> = Promise<{ data: T }>;

export type TServerResponseError<T> = {
  statusCode: number;
  data: { field: keyof T | null; message: string };
};

export type TServerResponse<P, E> = {
  payload: P;
  error: TServerResponseError<E>;
};

export const initialError = {
  field: null,
  message: '',
};

const DB_URL = 'http://localhost:5500/api';

class ApiServer {
  static async login(data: TLoginData): TAxiosResponse<TServerResponse<IEmployeeData, TLoginData>> {
    return await axios.post(DB_URL + '/employee/login', data);
  }

  static async getEmployeerList(
    companyId: number,
    token: string
  ): TAxiosResponse<TServerResponse<Array<{ fio: string; phone: string; email: string }>, null>> {
    return await axios.post(
      DB_URL + '/employee/list',
      { companyId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async createEmployeer(
    data: TCreatedEmployeerData
  ): TAxiosResponse<TServerResponse<{ username: string; password: string }, TEmploeerField>> {
    return await axios.post(DB_URL + '/employee/reg', data);
  }
  static async logout(token: string): TAxiosResponse<TServerResponse<number, unknown>> {
    return await axios.get(DB_URL + '/employee/logout', {
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  static async auth(token: string) {
    return await axios.get(DB_URL + '/employee/auth', {
      headers: {
        authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  static async createCompany(data: {
    companyData: Record<keyof TCompanyField, string>;
    employeeData: Record<keyof TEmployeeField, string>;
  }): TAxiosResponse<TServerResponse<TLoginData, Record<keyof TEmployeeField, string>>> {
    return await axios.post(DB_URL + '/company/create', data);
  }

  static async checkCompany(
    data: Record<keyof TCompanyField, string>
  ): TAxiosResponse<TServerResponse<boolean, Record<keyof TCompanyField, string>>> {
    return await axios.post(DB_URL + '/company/check', data);
  }

  static async getProductList(
    token: string,
    companyId: number
  ): TAxiosResponse<TServerResponse<Array<{ id: number; offerId: string; name: string }>, null>> {
    return await axios.post(
      DB_URL + '/product/list',
      { companyId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async createOrUpdateProductItem(
    token: string,
    data: TProductData & { characteristics: string; companyId: number }
  ): TAxiosResponse<TServerResponse<boolean, TProductData>> {
    return await axios.post(DB_URL + '/product/save', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getProductById(
    token: string,
    id: number
  ): TAxiosResponse<
    TServerResponse<
      {
        general: TProductData & { id: number };
        specs: Record<string, { enTitle: string; value: string }>;
        lists: Record<'barcodes' | 'images', Array<string>>;
      },
      { message: string }
    >
  > {
    return await axios.post(
      DB_URL + '/product/info',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async getSpecProductFieldList(
    token: string,
    category: string
  ): TAxiosResponse<TServerResponse<Record<string, string>, { message: string }>> {
    return await axios.post(
      DB_URL + '/category/fields',
      { category },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  static async removeProductItem(
    token: string,
    id: number
  ): TAxiosResponse<TServerResponse<Array<{ id: number; offerId: string; name: string }>, null>> {
    return await axios.post(
      DB_URL + '/product/delete',
      { id },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async getCountryList(): TAxiosResponse<TServerResponse<Array<string>, null>> {
    return await axios.get(DB_URL + '/library/countries');
  }

  static async getProductStockList(
    token: string,
    companyId: number
  ): TAxiosResponse<TServerResponse<TProductStockList, null>> {
    return await axios.post(
      DB_URL + '/product/stock-list',
      { companyId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async updateProductStock(
    token: string,
    data: Array<{ id: number; stock: number }>,
    companyId: number
  ): TAxiosResponse<TServerResponse<TProductStockList, null>> {
    return await axios.post(
      DB_URL + '/product/stock-update',
      { data, companyId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default ApiServer;
