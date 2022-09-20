import React, { ChangeEvent, createRef, FormEvent, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './commentform.css';
import { EColors, Text } from '../Text';

interface ICommentForm {
  value: string;
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholderValue?: string;
  onClickCancel?: () => void;
  isEditing?: boolean;
}
type TErrors = {
  comment?: string;
};

// export const CommentForm = React.forwardRef((props: ICommentForm, ref: ForwardedRef<HTMLTextAreaElement>) => {
export const CommentForm = (props: ICommentForm) => {
  const { value, onSubmit, onChange, placeholderValue, onClickCancel, isEditing } = props;

  const ref = createRef<HTMLTextAreaElement>();
  useEffect(() => {
    isEditing && ref.current?.focus();
  }, [isEditing]);

  return (
    // <Formik
    //   initialValues={{ comment: '' }}
    //   validate={values => {
    //     const errors: TErrors = {};
    //     if (values.comment.length <= 3) {
    //       errors.comment = 'Введите больше 3 символов';
    //     }
    //     return errors;
    //   }}
    //   onSubmit={(values, { setSubmitting }) => {
    //     setTimeout(() => {
    //       alert(JSON.stringify(values, null, 2));
    //       setSubmitting(false);
    //     }, 400);
    //   }}
    // >
    //   {({ isSubmitting }) => (
    //     <Form className={styles.form}>
    //       <Field as='textarea' type='text' className={styles.input} name="comment"/>
    //       <ErrorMessage className={styles.invalidMsg} name="comment" component="div" />
    //       <div className={styles.btns}>
    //         {onClickCancel !== undefined && <button type='button' className={styles.cancelButton} onClick={onClickCancel} >Cancel</button>}
    //         <button type='submit' className={styles.button} disabled={isSubmitting} onClick={test}>Comment</button>
    //       </div>
    //     </Form>
    //   )}
    // </Formik>
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea ref={ref} className={styles.input} value={value} onChange={onChange} placeholder={placeholderValue} />
      {/* {validateValue() && (<div>{validateValue()}</div>)} */}
      <div className={styles.btns}>
        <button type='submit' className={styles.button}>
          Комментровать
        </button>
        {onClickCancel !== undefined && (
          <button type='button' className={styles.cancelButton} onClick={onClickCancel}>
            <Text size={16} mobileSize={12} color={EColors.black}>
              Закрыть
            </Text>
          </button>
        )}
      </div>
    </form>
  );
};
