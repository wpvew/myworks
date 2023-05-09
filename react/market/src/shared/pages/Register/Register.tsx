import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ApiServer, { initialError, TServerResponseError } from '../../API/ApiServer';
import { objectBlender } from '../../utils/objectBlender';
import { TLoginData } from '../Auth';
import { CreateCompanySuccess } from '../../layouts/CreateCompanySuccess';
import { UContainer } from '../../components/UContainer';
import { UBox } from '../../components/UBox';
import { UFormWrap } from '../../components/UFormWrap';
import { UFormFlood } from '../../components/UFormWrap/UFormFlood';
import classNames from 'classnames';
import styles from './register.scss';

export type TField = {
  enTitle: string;
  value: string;
  placeholder: string;
};

export type TCompanyField = Record<'name' | 'inn' | 'fio' | 'email', TField>;

export type TEmployeeField = Record<'username' | 'phone', TField>;

export function Register() {
  const [company, setCompany] = useState<TCompanyField>({
    name: { enTitle: 'Сomapany', value: '', placeholder: 'Название компании' },
    inn: { enTitle: 'INN', value: '', placeholder: 'ИНН компании' },
    fio: { enTitle: 'FIO', value: '', placeholder: 'ФИО владельца' },
    email: { enTitle: 'Email', value: '', placeholder: 'Email компании' },
  });

  const [employee, setEmployee] = useState<TEmployeeField>({
    username: { enTitle: 'Username', value: '', placeholder: 'Username' },
    phone: { enTitle: 'Phone', value: '', placeholder: 'Телефон' },
  });

  const [isCompanyValid, setIsCompanyValid] = useState(false);

  const [createdEmployee, setCreatedEmployee] = useState<TLoginData>({
    username: '',
    password: '',
    companyId: '',
  });

  const [errCompany, setErrCompany] = useState<
    TServerResponseError<Record<keyof TCompanyField, string>>
  >({
    statusCode: 0,
    data: initialError,
  });
  const [errEmployee, setErrEmployee] = useState<
    TServerResponseError<Record<keyof TEmployeeField, string>>
  >({
    statusCode: 0,
    data: initialError,
  });

  const handleChangeCompany = (field: keyof typeof company, e: ChangeEvent<HTMLInputElement>) => {
    setCompany({ ...company, [field]: { ...company[field], value: e.target.value } });
  };
  const handleChangeEmployee = (field: keyof typeof employee, e: ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [field]: { ...employee[field], value: e.target.value } });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isCompanyValid) {
      ApiServer.checkCompany(objectBlender(company)).then(({ data: { payload, error } }) => {
        if (payload) setIsCompanyValid(true);
        if (error.data?.field) {
          const errorMsg = `${company[error.data.field].enTitle + error.data.message}`;
          setErrCompany({ ...error, data: { ...error.data, message: errorMsg } });
        }
      });
    } else {
      ApiServer.createCompany({
        companyData: objectBlender(company),
        employeeData: objectBlender(employee),
      }).then(({ data: { payload, error } }) => {
        if (payload) setCreatedEmployee(payload);
        if (error.data?.field) {
          const errorMsg = `${employee[error.data.field].enTitle + error.data.message}`;
          setErrEmployee({ ...error, data: { ...error.data, message: errorMsg } });
        }
      });
    }
  };

  useEffect(() => {
    if (errEmployee.statusCode) setErrEmployee({ statusCode: 0, data: initialError });
  }, [...Object.values(employee)]);
  useEffect(() => {
    if (errCompany.statusCode) setErrCompany({ statusCode: 0, data: initialError });
  }, [...Object.values(company)]);

  return (
    <main className={styles.main}>
      <section className={styles.register}>
        <UContainer display='flex'>
          <UBox display='flex' sx={{ justifyContent: 'center', alignSelf: 'center' }}>
            {!createdEmployee.companyId && (
              <UFormWrap
                title='Регистрация компании'
                className={classNames(styles.form, isCompanyValid && styles.swiped)}
                handleSubmit={handleSubmit}
              >
                <UFormFlood
                  data={company}
                  handleChange={handleChangeCompany}
                  buttonText='Далее'
                  errorMsg={errCompany}
                />
                <UFormFlood
                  data={employee}
                  handleChange={handleChangeEmployee}
                  buttonText='Создать'
                  errorMsg={errEmployee}
                  handleClickBack={() => setIsCompanyValid(false)}
                />
              </UFormWrap>
            )}
            {createdEmployee.companyId && <CreateCompanySuccess employeeData={createdEmployee} />}
          </UBox>
        </UContainer>
      </section>
    </main>
  );
}
