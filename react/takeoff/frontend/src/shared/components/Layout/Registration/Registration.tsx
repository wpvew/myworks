import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiServer, TServerResponseUser } from '../../../API/ApiServer';
import { SuccessReg } from '../../SuccessReg';
import { TError } from '../../../utils/ParseError';
import { Modal } from '../../Modal';
import { makeUserFromRegData } from '../../../utils/parseData';
import { response } from '../../../utils/response';
import styles from '../../../styles/authorization.scss';
import { CustomLoadingBtn } from '../../UI/CustomLoadingBtn';

type TRegField = { title: string; value: string; type: string };

export type TRegData = {
  username: TRegField;
  password: TRegField;
  repeatPassword: TRegField;
};

export function Registration() {
  const [isSuccessReg, setIsSuccessReg] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [regData, setRegData] = useState<TRegData>({
    username: { title: 'username', value: '', type: 'text' },
    password: { title: 'password', value: '', type: 'password' },
    repeatPassword: { title: 'repeat password', value: '', type: 'password' },
  });

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>, key: keyof TRegData) => {
    setRegData({ ...regData, [key]: e.target.value });
    setRegData({ ...regData, [key]: { ...regData[key], value: e.target.value } });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      ApiServer.registration(makeUserFromRegData(regData))
        .then(({ error }: TServerResponseUser) => {
          if (error) throw error;
          setLoading(false);
          setIsSuccessReg(true);
        })
        .catch((error: TError) => {
          setLoading(false);
          setErrMsg(error.message);
        });
    } catch (error) {
      setLoading(false);
      setErrMsg(response({ payload: null, error }).error.message);
    }
  };

  const handleSuccessModalSwitch = () => {
    setIsSuccessReg(!isSuccessReg);
  };
  return (
    <div className={styles.container}>
      <div className={styles.authorization}>
        <h1 className={styles.title}>Регистрация</h1>
        <form className={styles.authorizationForm} onSubmit={handleSubmit}>
          {(Object.keys(regData) as Array<keyof TRegData>).map((field) => (
            <div key={field} className={styles.inputGroup}>
              <span className={styles.inputTitle}>{regData[field].title}</span>
              <input
                value={regData[field].value}
                onChange={(e) => handleChangeInput(e, field)}
                className={styles.input}
                name={field}
                type={regData[field].type}
              />
            </div>
          ))}
          {errMsg && <div className={styles.regErr}>{errMsg}</div>}

          <div className={styles.controlBtn}>
            {/* <button className={styles.loginBtn}>Зарегестрироваться</button> */}
            <CustomLoadingBtn type='submit' loading={loading} variant='outlined'>
              Зарегестрироваться
            </CustomLoadingBtn>
          </div>
        </form>
        {isSuccessReg && (
          <Modal onClose={handleSuccessModalSwitch}>
            <SuccessReg />
          </Modal>
        )}
      </div>
      <button onClick={() => navigate('/auth')} className={styles.backBtn}>
        Назад
      </button>
    </div>
  );
}
