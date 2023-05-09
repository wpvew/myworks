import React from 'react';
import ApiServer from '../../../API/ApiServer';
import { useProductCardData } from '../../../hooks/useProductCardData';
import { isKeyOf } from '../../../utils/isKeyOf';
import { UIInput } from '../../../components/UIInput';
import styles from './product.scss';

export function ProductCard() {
  const {
    category,
    productData,
    specProductData,
    err,
    productListsData,
    handleChangeCategory,
    handleChangeProductData,
    handleChangeSpecProductData,
    handleSubmit,
  } = useProductCardData();

  const handleClickInput = () => {
    ApiServer.getCountryList().then(console.log);
  };

  return (
    <div className=''>
      <select name='' value={category} onChange={handleChangeCategory}>
        <option value='smp'>Smartphones</option>
        <option value='tab'>Tabs</option>
        <option value='watch'>Watch</option>
      </select>
      <form onSubmit={handleSubmit}>
        {(Object.keys(productData) as Array<keyof typeof productData>).map((key, i) => (
          <li key={i}>
            <UIInput
              title={productData[key].enTitle}
              value={productData[key].value}
              onChange={(e) => handleChangeProductData(e, key)}
              errorMsg={err.data?.field === key ? err.data.message : ''}
            />
            {isKeyOf(productListsData, key) &&
              productListsData[key].map((item) => <span key={item}>{item}; </span>)}
          </li>
        ))}
        <h3>Characteristics</h3>
        {(Object.keys(specProductData) as Array<keyof typeof specProductData>).map((key) => (
          <li key={key}>
            <UIInput
              title={specProductData[key].enTitle}
              value={specProductData[key].value}
              onChange={(e) => handleChangeSpecProductData(e, key)}
              errorMsg={err.data?.field === key ? err.data.message : ''}
            />
          </li>
        ))}
        <button>Save</button>
      </form>
    </div>
  );
}
