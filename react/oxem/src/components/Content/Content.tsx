import React, { FormEvent, useEffect, useState } from 'react';
import { serverAPI } from '../../API/serverAPI';
import { Container } from '../Container';
import { EValueName, InputGroup } from './InputGroup';
import { validationNumber } from '../../utils/validation';
import { CalcGroup } from './CalcGroup';
import { ButtonSubLoading } from '../../UI/ButtonSubLoading';
import styles from '../../styles/content.scss';

export type TLeaseData = {
  price: number;
  initialPer: number;
  month: number;
  monthPay: number;
  amountDeal: number;
};
export type TValues = {
  price: number;
  initialPer: number;
  month: number;
};

export type TRange = {
  min: number;
  max: number;
};

export function Content() {
  const [values, setValues] = useState<TValues>({
    price: 3300000,
    initialPer: 13,
    month: 60,
  });

  const rangePrice = {
    min: 1000000,
    max: 6000000,
  };
  const rangeInitial = {
    min: 10,
    max: 60,
  };
  const rangeMonth = {
    min: 1,
    max: 60,
  };
  const [isLoading, setIsLoading] = useState(false);

  const [initialValue, setInitialValue] = useState(
    Math.round(values.price / 100) * values.initialPer
  );

  const monthPay = Math.round(
    (values.price - values.initialPer) *
      ((0.035 * Math.pow(1 + 0.035, values.month)) / (Math.pow(1 + 0.035, values.month) - 1))
  );

  const amountDeal = Math.round(values.initialPer + values.month * monthPay);

  useEffect(() => {
    setInitialValue(Math.round(values.price / 100) * values.initialPer);
  }, [values]);

  const handleChange = (value: string, key: string) => {
    setValues({ ...values, [key]: +validationNumber(value) });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    serverAPI
      .postData({ ...values, monthPay: monthPay, amountDeal: amountDeal })
      .then(console.log)
      .finally(() => setIsLoading(false));
  };

  return (
    <main className={styles.main}>
      <Container>
        <form onSubmit={(e: FormEvent) => handleSubmit(e)} className={styles.form}>
          <InputGroup
            title='Стоимость автомобиля'
            value={values.price}
            handleChange={handleChange}
            rangeObj={rangePrice}
            classes={styles.input}
            valueName={EValueName.price}
            inputName='₽'
          />
          <InputGroup
            title='Первоначальный взнос'
            value={values.initialPer}
            handleChange={handleChange}
            rangeObj={rangeInitial}
            classes={styles.keyPercent}
            valueName={EValueName.initialPer}
          >
            <input value={initialValue} className={styles.input} type='text' disabled />
          </InputGroup>
          <InputGroup
            title='Срок лизинга'
            value={values.month}
            handleChange={handleChange}
            rangeObj={rangeMonth}
            classes={styles.input}
            valueName={EValueName.month}
            inputName='мес.'
          />
          <CalcGroup title='Сумма договора лизинга' amount={amountDeal} />
          <CalcGroup title='Ежемесячный платеж от' amount={monthPay} />
          <ButtonSubLoading onClick={handleSubmit} loading={isLoading}>
            Оставить заявку
          </ButtonSubLoading>
        </form>
      </Container>
    </main>
  );
}
