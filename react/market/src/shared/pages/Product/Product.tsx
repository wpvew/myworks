import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Link } from 'react-router-dom';
import ApiServer, { TServerResponseError, initialError } from '../../API/ApiServer';
import styles from './product.scss';
import { UContainer } from '../../components/UContainer';
import { Navbar } from '../../layouts/Navbar';
import { UBox } from '../../components/UBox';

export function Product() {
  const { token, companyId } = useAppSelector((state) => state.emplyeeSliceReducer.employee);
  const [err, setErr] = useState<TServerResponseError<null>>({ statusCode: 0, data: initialError });
  const [productList, setProductList] = useState([{ id: 0, name: '', offerId: '' }]);

  useEffect(() => {
    ApiServer.getProductList(token, companyId).then(({ data: { payload, error } }) => {
      if (payload) setProductList(payload);
      if (error.statusCode) setErr(error);
    });
  }, []);

  const handleDelete = (id: number) => {
    ApiServer.removeProductItem(token, id).then(({ data: { payload, error } }) => {
      if (payload) setProductList(payload);
      if (error.statusCode) setErr(error);
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.product}>
        <UContainer display='flex'>
          <Navbar />
          <UBox>
            <Link to={'/product-card'}>Add new card</Link>
            {err.statusCode ? (
              <p>{err.data.message}</p>
            ) : (
              productList.map((item) => (
                <li key={item.offerId}>
                  <span>{item.name}</span>
                  <Link to={`/product-card/${item.id}`}>edit</Link>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              ))
            )}
          </UBox>
        </UContainer>
      </section>
    </main>
  );
}
