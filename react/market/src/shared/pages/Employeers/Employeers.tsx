import React, { useEffect, useState } from 'react';
import { UContainer } from '../../components/UContainer';
import { Navbar } from '../../layouts/Navbar';
import ApiServer from '../../API/ApiServer';
import { useAppSelector } from '../../store/hooks';
import { generateId } from '../../utils/generateRandomIndex';
import { UTypegraphy } from '../../components/UTypegraphy';
import { CreateEmployeer } from './CreateEmployeer';
import styles from './employeers.scss';

export function Employeers() {
  const { token, companyId } = useAppSelector((state) => state.emplyeeSliceReducer.employee);
  const [employeeList, setEmployeeList] = useState<
    Array<{ fio: string; phone: string; email: string }>
  >([]);

  useEffect(() => {
    ApiServer.getEmployeerList(companyId, token).then(({ data: { payload, error } }) => {
      setEmployeeList(payload);
    });
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.employee}>
        <UContainer display='flex'>
          <Navbar />
          <div className={styles.test}>
            <div className=''>
              <CreateEmployeer />
            </div>
            <div className={styles.empl}>
              <div className={styles.header}>
                <UTypegraphy Tag='span' size='m'>
                  FIO
                </UTypegraphy>
                <UTypegraphy Tag='span' size='m'>
                  Phone
                </UTypegraphy>
                <UTypegraphy Tag='span' size='m'>
                  Email
                </UTypegraphy>
              </div>
              <ul className={styles.list}>
                {employeeList.map(generateId).map((item) => (
                  <li className={styles.item} key={item.id}>
                    <UTypegraphy Tag='span' size='s'>
                      {item.fio}
                    </UTypegraphy>
                    <UTypegraphy Tag='span' size='s'>
                      {item.phone}
                    </UTypegraphy>
                    <UTypegraphy Tag='span' size='s'>
                      {item.email}
                    </UTypegraphy>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </UContainer>
      </section>
    </main>
  );
}
