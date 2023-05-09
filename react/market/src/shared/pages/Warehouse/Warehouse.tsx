import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import styles from './warehouse.scss';
import { useAppSelector } from '../../store/hooks';
import ApiServer from '../../API/ApiServer';
import { Link } from 'react-router-dom';
import { UContainer } from '../../components/UContainer';
import { Navbar } from '../../layouts/Navbar';

export type TProductStockList = Array<
  Record<'name' | 'brand' | 'color' | 'offerId', string> & {
    id: number;
    stock: number;
    barcodes: Array<string>;
    isDisabled: boolean;
  }
>;

export function Warehouse() {
  const { token, companyId } = useAppSelector((state) => state.emplyeeSliceReducer.employee);
  const [productStockList, setProductStockList] = useState<TProductStockList>([]);
  const refInput = useRef([]);

  useEffect(() => {
    ApiServer.getProductStockList(token, companyId).then(({ data: { payload, error } }) => {
      if (payload) setProductStockList(payload.map((item) => ({ ...item, isDisabled: true })));
    });
  }, []);

  const handleChangeStock = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const test = productStockList[i];
    test.stock = +e.target.value;
    const updatedStock = productStockList;
    updatedStock.splice(i, 1, test);
    setProductStockList([...updatedStock]);
  };

  const handleChangeInput = (i: number, id: number) => {
    const test = productStockList[i];
    test.isDisabled = !test.isDisabled;
    const updatedStock = productStockList;
    updatedStock.splice(i, 1, test);
    setProductStockList([...updatedStock]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedProductStock = productStockList.map(({ id, stock }) => ({ id, stock }));
    ApiServer.updateProductStock(token, updatedProductStock, companyId).then(console.log);
  };
  return (
    <main className={styles.main}>
      <section>
        <UContainer display='flex'>
          <Navbar />
          <form onSubmit={handleSubmit}>
            {productStockList.map((productStock, i) => (
              <li key={productStock.id}>
                {productStock.offerId + ' - '}
                <input
                  value={productStock.stock || 0}
                  onChange={(e) => handleChangeStock(e, i)}
                  disabled={productStock.isDisabled}
                  onBlur={() => handleChangeInput(i, productStock.id)}
                  type='text'
                />
                <button type='button' onClick={() => handleChangeInput(i, productStock.id)}>
                  edit
                </button>
              </li>
            ))}
            <button>Save</button>
          </form>
        </UContainer>
      </section>
    </main>
  );
}
