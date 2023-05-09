import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import ApiServer, { TServerResponseError, initialError } from '../API/ApiServer';
import { objectBlender } from '../utils/objectBlender';

export const emptyProductData = {
  brand: { enTitle: 'Brand', value: '' },
  name: { enTitle: 'Name', value: '' },
  price: { enTitle: 'Price', value: '' },
  priceSale: { enTitle: 'Sale price', value: '' },
  images: { enTitle: 'Images', value: '' },
  barcodes: { enTitle: 'EAN/UPC', value: '' },
  offerId: { enTitle: 'ID', value: '', isDisabled: false },
  description: { enTitle: 'Description', value: '' },
  color: { enTitle: 'Color', value: '' },
  coo: { enTitle: 'Country of origin', value: '' },
  // characteristics: { enTitle: 'characteristics', value: '' },
};

export type TProductData = Record<keyof typeof emptyProductData, string>;

export function useProductCardData() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, companyId } = useAppSelector((state) => state.emplyeeSliceReducer.employee);
  const [isMounted, setIsMounted] = useState(false);
  const [err, setErr] = useState<TServerResponseError<TProductData>>({
    statusCode: 0,
    data: initialError,
  });
  const [category, setCategory] = useState('smp');
  const [productData, setProductData] = useState(emptyProductData);
  const [productListsData, setProductListsData] = useState({ barcodes: [''], images: [''] });
  const [specProductData, setSpecProductData] = useState<
    Record<string, { enTitle: string; value: string }>
  >({});

  useEffect(() => {
    if (id)
      ApiServer.getProductById(token, +id).then(
        ({
          data: {
            payload: { general, specs, lists },
            error,
          },
        }) => {
          const generalCharact = (Object.keys(productData) as Array<keyof TProductData>).reduce(
            (newObj, key) => {
              return {
                ...newObj,
                [key]: { ...productData[key], value: general[key] },
                barcodes: productData.barcodes,
                images: productData.images,
                offerId: {
                  enTitle: productData['offerId'].enTitle,
                  value: general['offerId'],
                  isDisabled: true,
                },
              };
            },
            {} as typeof emptyProductData
          );

          const specsCharact = (Object.keys(specs) as Array<keyof typeof specs>).reduce(
            (newObj, key) => {
              return {
                ...newObj,
                [key]: { enTitle: specs[key].enTitle, value: specs[key].value },
              };
            },
            {}
          );

          setProductData(generalCharact);
          setSpecProductData(specsCharact);
          setProductListsData(lists);
        }
      );
    else {
      getAndSetSpecProductFieldList();
    }

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) getAndSetSpecProductFieldList();
  }, [category]);

  function getAndSetSpecProductFieldList() {
    ApiServer.getSpecProductFieldList(token, category).then(({ data: { payload, error } }) => {
      // console.log(payload);
      const specFieldList = (Object.keys(payload) as Array<keyof typeof payload>).reduce(
        (newObj, key) => {
          return {
            ...newObj,
            [key]: { enTitle: payload[key], value: '' },
          };
        },
        {} as Record<string, { enTitle: string; value: string }>
      );
      setSpecProductData(specFieldList);
    });
  }

  const handleChangeProductData = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof productData
  ) => {
    setProductData({ ...productData, [key]: { ...productData[key], value: e.target.value } });
  };

  const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleChangeSpecProductData = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof typeof specProductData
  ) => {
    setSpecProductData({
      ...specProductData,
      [key]: { ...specProductData[key], value: e.target.value },
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    ApiServer.createOrUpdateProductItem(token, {
      ...objectBlender(productData),
      characteristics: JSON.stringify(specProductData),
      companyId,
    }).then(({ data: { payload, error } }) => {
      if (error.data?.field) {
        const errMsg = `${productData[error.data.field].enTitle}` + ' ' + error.data.message;
        setErr({ ...error, data: { ...error.data, message: errMsg } });
      }
      if (payload) navigate('/products');
    });
  };

  useEffect(() => {
    setErr({ statusCode: 0, data: initialError });
  }, [...Object.values(productData).map((item) => item.value)]);

  return {
    category,
    productData,
    productListsData,
    specProductData,
    err,
    handleChangeProductData,
    handleChangeCategory,
    handleChangeSpecProductData,
    handleSubmit,
  };
}
