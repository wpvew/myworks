import React, { ChangeEvent } from 'react';
import { TRange } from '../Content';
import { validationNumber } from '../../../utils/validation';
import { RangeSlider } from '../../../UI/RangeSlider';
import styles from '../../../styles/inputgroup.scss';

interface IInputGroupProps {
  title: string;
  value: number;
  handleChange: (value: string, key: string) => void;
  rangeObj: TRange;
  valueName: EValueName;
  inputName?: string;
  children?: React.ReactNode;
  classes?: string;
}

export enum EValueName {
  price = 'price',
  initialPer = 'initialPer',
  month = 'month',
}

export function InputGroup(props: IInputGroupProps) {
  const { title, value, handleChange, rangeObj, children, classes, valueName, inputName } = props;

  const handleSliderChange = (e: Event, newValue: number | number[]) => {
    handleChange(String(newValue), valueName);
  };

  const handleSliderChangePrice = (e: Event, newValue: number | number[]) => {
    handleChange(String(RangeRestrict((+newValue * rangeObj.max) / 100)), valueName);
  };

  function choiceHandle() {
    if (valueName === EValueName.price) {
      return handleSliderChangePrice;
    } else {
      return handleSliderChange;
    }
  }

  function RangeRestrict(limit: number | number[]) {
    return rangeObj.max < limit ? rangeObj.max : rangeObj.min > limit ? rangeObj.min : limit;
  }

  return (
    <div className={styles.formGroup}>
      <span className={styles.formGroupTitle}>{title}</span>
      <div className={styles.inputGroup}>
        {children}
        <input
          value={valueName === EValueName.initialPer ? `${value}%` : value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(e.target.value, valueName);
          }}
          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
            handleChange(String(RangeRestrict(+validationNumber(e.target.value))), valueName);
          }}
          className={classes}
          type='text'
          name={valueName}
        />
        {inputName && <span className={styles.key}>{inputName}</span>}
      </div>
      <RangeSlider
        value={valueName === EValueName.price ? (value / rangeObj.max) * 100 : value}
        onChange={choiceHandle()}
        step={1}
        min={valueName === EValueName.price ? (rangeObj.min / rangeObj.max) * 100 : rangeObj.min}
        max={valueName === EValueName.price ? 101 : rangeObj.max}
        name={valueName}
      />
    </div>
  );
}
