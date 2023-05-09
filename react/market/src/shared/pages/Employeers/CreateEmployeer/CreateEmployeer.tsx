import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ApiServer, { TServerResponseError, initialError } from '../../../API/ApiServer';
import { useAppSelector } from '../../../store/hooks';
import { objectBlender } from '../../../utils/objectBlender';
import { TField } from '../../Register';
import { UFormFlood } from '../../../components/UFormWrap/UFormFlood';
import { UTypegraphy } from '../../../components/UTypegraphy';
import { UButton } from '../../../components/UButton';
import styles from './createemployeer.scss';
import { EmployeeCreatedSuccess } from './EmployeeCreatedSuccess';

// const permissions = {
//   hr: 'employees',
//   logistic: 'supplies',
//   warehouse: 'inventory',
//   content: 'products',
//   analytic: 'analytics',
// };
export type TEmploeerField = Record<'username' | 'fio' | 'email' | 'phone', TField>;

export type TCreatedEmployeerData = Record<
  keyof TEmploeerField | 'companyId' | 'permissions',
  string
>;

export function CreateEmployeer() {
  const companyId = useAppSelector((state) => state.emplyeeSliceReducer.employee.companyId);
  const [permissions, setPermissions] = useState({
    hr: { enTitle: 'HR', checked: false },
    logistic: { enTitle: 'Logistic', checked: false },
    warehouse: { enTitle: 'Warehouse', checked: false },
    content: { enTitle: 'Content', checked: false },
    analytic: { enTitle: 'Analytic', checked: false },
  });

  const [employee, setEmployee] = useState<TEmploeerField>({
    username: { enTitle: 'Username', value: '', placeholder: 'Username сотрудника' },
    fio: { enTitle: 'FIO', value: '', placeholder: 'ФИО сотрудника' },
    email: { enTitle: 'Email', value: '', placeholder: 'Email сотрудника' },
    phone: { enTitle: 'Phone', value: '', placeholder: 'Телефон сотрудника' },
  });

  const clearForm = () => {
    setEmployee({
      username: { ...employee.username, value: '' },
      fio: { ...employee.fio, value: '' },
      email: { ...employee.email, value: '' },
      phone: { ...employee.phone, value: '' },
    });

    setPermissions({
      hr: { ...permissions.hr, checked: false },
      logistic: { ...permissions.logistic, checked: false },
      warehouse: { ...permissions.warehouse, checked: false },
      content: { ...permissions.content, checked: false },
      analytic: { ...permissions.analytic, checked: false },
    });
  };

  const [createdEmployeerData, setCreatedEmployeerData] = useState({ username: '', password: '' });
  const [err, setErr] = useState<TServerResponseError<Record<keyof TEmploeerField, string>>>({
    statusCode: 0,
    data: initialError,
  });

  const handleChangeEmployee = (field: keyof typeof employee, e: ChangeEvent<HTMLInputElement>) => {
    setEmployee({ ...employee, [field]: { ...employee[field], value: e.target.value } });
  };

  const handleChangeRuls = (checkbox: keyof typeof permissions) => {
    setPermissions({
      ...permissions,
      [checkbox]: { ...permissions[checkbox], checked: !permissions[checkbox].checked },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const rights = (Object.keys(permissions) as Array<keyof typeof permissions>).reduce(
      (newObj, key) => {
        return {
          ...newObj,
          [key]: permissions[key].checked,
        };
      },
      {} as Record<keyof typeof permissions, boolean>
    );

    const employeeData: TCreatedEmployeerData = {
      ...objectBlender(employee),
      permissions: JSON.stringify(rights),
      companyId: String(companyId),
    };

    await ApiServer.createEmployeer(employeeData).then(({ data: { payload, error } }) => {
      if (payload) {
        setCreatedEmployeerData(payload);
        clearForm();
      }
      if (error.data?.field) {
        const errorMsg = `${employee[error.data.field].enTitle + error.data.message}`;
        setErr({ ...error, data: { ...error.data, message: errorMsg } });
      }
    });
  };

  useEffect(() => {
    setErr({ statusCode: 0, data: initialError });
  }, [...Object.values(employee)]);

  return (
    <div className={styles.box}>
      <UTypegraphy Tag='h2' size='l' sx={{ padding: '20px' }}>
        Добавить сотрудника
      </UTypegraphy>
      <div className={styles.header}>
        <UTypegraphy Tag='span' size='m'>
          Данные
        </UTypegraphy>
        <UTypegraphy Tag='span' size='m'>
          Права
        </UTypegraphy>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <UFormFlood
          data={employee}
          handleChange={handleChangeEmployee}
          buttonText='Добавить'
          errorMsg={err}
          sx={{ padding: 0 }}
        />
        <div className={styles.permissions}>
          {(
            Object.entries(permissions) as Array<
              [keyof typeof permissions, { enTitle: string; checked: boolean }]
            >
          ).map(([key, field]) => (
            <div className={styles.inputGroup} key={key}>
              <input
                className={styles.checkbox}
                checked={field.checked}
                onChange={() => handleChangeRuls(key)}
                type='checkbox'
              />
              <UTypegraphy Tag='span' size='m'>
                {field.enTitle}
              </UTypegraphy>
            </div>
          ))}
          <UButton Tag={'button'} size='xs' sx={{ marginTop: 'auto', alignSelf: 'flex-end' }}>
            Добавить
          </UButton>
        </div>
      </form>
      {createdEmployeerData.username && (
        <EmployeeCreatedSuccess
          data={createdEmployeerData}
          onClose={() => setCreatedEmployeerData({ username: '', password: '' })}
        />
      )}
      {/* <EmployeeCreatedSuccess
        data={createdEmployeerData}
        onClose={() => setCreatedEmployeerData({ username: '', password: '' })}
      /> */}
    </div>
  );
}
