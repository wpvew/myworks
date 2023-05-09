import React, { ChangeEvent } from 'react';
import ReactInputMask from 'react-input-mask';
import classNames from 'classnames';
import styles from './uiinput.scss';

interface IUIInuptProps {
  title: string;
  value?: string;
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  errorMsg?: string;
  maskType?: 'phone';
  placeholder?: string;
  type?: 'text' | 'checkbox';
  titlePosition?: 'left' | 'right';
}

export function UIInput(props: IUIInuptProps) {
  const {
    title,
    value,
    checked,
    titlePosition = 'left',
    onChange,
    errorMsg,
    maskType,
    placeholder,
    type = 'text',
  } = props;

  const inputMask = {
    phone: {
      mask: '+7(999) 999-99-99',
      maskChar: '_',
    },
  };

  return (
    <div className={styles.inputGroup}>
      <span className={classNames(styles.title, styles[titlePosition])}>{title}</span>
      {!maskType ? (
        <input
          className={classNames(styles.input, errorMsg && styles.errorInput)}
          value={value}
          checked={checked}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <ReactInputMask
          className={classNames(styles.input, errorMsg && styles.errorInput)}
          value={value}
          onChange={onChange}
          mask={inputMask[maskType].mask}
          maskChar={inputMask[maskType].maskChar}
          placeholder={placeholder}
        />
      )}
      {errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
    </div>
  );
}
