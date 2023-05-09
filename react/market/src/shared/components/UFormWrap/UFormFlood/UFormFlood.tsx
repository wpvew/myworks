import React, { CSSProperties, ChangeEvent } from 'react';
import { UIInput } from '../../../components/UIInput';
import { UButton } from '../../../components/UButton';
import { TServerResponseError } from '../../../API/ApiServer';
import { TField } from '../../../pages/Register';
import styles from './uformflood.scss';

interface IUFormFlood<T> {
  data: T;
  handleChange: (key: keyof T, e: ChangeEvent<HTMLInputElement>) => void;
  buttonText: string;
  errorMsg: TServerResponseError<Record<keyof T, string>>;
  handleClickBack?: () => void;
  sx?: CSSProperties;
}

export function UFormFlood<T extends object>({
  data,
  handleChange,
  buttonText,
  handleClickBack,
  errorMsg,
  sx,
}: IUFormFlood<T>) {
  return (
    <div className={styles.form} style={sx}>
      {(Object.entries(data) as Array<[keyof typeof data, TField]>).map(([key, field], i) => (
        <React.Fragment key={i}>
          <UIInput
            title={field.enTitle}
            value={field.value}
            onChange={(e) => handleChange(key, e)}
            errorMsg={errorMsg.data?.field == key ? errorMsg.data.message : ''}
            placeholder={field.placeholder}
            maskType={key === 'phone' ? 'phone' : undefined}
          />
        </React.Fragment>
      ))}
      {/* <UButton Tag='button' size='xs' sx={{ marginTop: '20px', alignSelf: 'flex-end' }}>
        {buttonText}
      </UButton> */}
      {handleClickBack && (
        <UButton
          Tag={'button'}
          type='button'
          variant='text'
          size='xs'
          onClick={handleClickBack}
          sx={{ position: 'absolute', top: '-30px', left: '10px' }}
        >
          back
        </UButton>
      )}
    </div>
  );
}
