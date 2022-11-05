import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiServer, TServerResponseClient } from '../../API/ApiServer';
import { ClientForm } from './ClientForm';
import { generateId } from '../../utils/generateRandomIndex';
import { getClientList } from '../../store/slices/clientListSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateModalState } from '../../store/slices/modalSlice';
import { validationContact } from '../../utils/validation';
import { fetchClientData, updateClientData } from '../../store/slices/clientDataSlice';
import { Modal } from '../Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { makeClientFromForm } from '../../utils/parseData';

type TField = {
  value: string;
  title: string;
  type: string;
  isRequire: boolean;
  isValid: boolean | null;
};

export interface TContact {
  id: string;
  field: string;
  value: string;
  type: string;
  isValid: boolean | null;
}

export type TClientDataMod = {
  surname: TField;
  name: TField;
  lastName: TField;
  contacts: Array<TContact>;
};

export function ClientFormContainer() {
  const token = useAppSelector((state) => state.userReducer.user.token);
  const dispatch = useAppDispatch();
  const params = useParams() as { id: string; [N: string]: string };
  const navigate = useNavigate();
  const { clientData, error, loading } = useAppSelector((state) => state.clientDataReducer);
  const [loadingNewAndUpdatedClient, setLoadingNewAndUpdatedClient] = useState(false);
  const [triedToSend, setTriedToSend] = useState(false);

  useEffect(() => {
    if (params.id) dispatch(fetchClientData(params.id));
  }, []);

  const validationData = () => {
    setTriedToSend(true);
    dispatch(
      updateClientData({
        ...clientData,
        surname: { ...clientData.surname, isValid: clientData.surname.value.length > 2 },
        name: { ...clientData.name, isValid: clientData.name.value.length > 2 },
        contacts: clientData.contacts.map((contact) => ({
          ...contact,
          isValid: validationContact(contact.field, contact.value),
        })),
      })
    );
  };

  const handleChangePersonDataValue = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof Omit<TClientDataMod, 'contacts'>
  ) => {
    dispatch(
      updateClientData({
        ...clientData,
        [field]: {
          ...clientData[field],
          value: e.target.value,
          isValid: !triedToSend
            ? clientData[field].isValid
            : clientData[field].isRequire
            ? clientData[field].value.length > 2
            : true,
        },
      })
    );
  };

  const handleChangeContactValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    dispatch(
      updateClientData({
        ...clientData,
        contacts: clientData.contacts.map((contact) =>
          contact.id !== id
            ? contact
            : {
                ...contact,
                value: e.target.value,
                isValid: triedToSend ? validationContact(contact.field, e.target.value) : null,
              }
        ),
      })
    );
  };
  const handleChangeContactField = (field: string, id: string) => {
    dispatch(
      updateClientData({
        ...clientData,
        contacts: clientData.contacts.map((contact) => (contact.id !== id ? contact : { ...contact, field })),
      })
    );
  };

  const handleClickAddContact = () => {
    if (clientData.contacts.length < 6) {
      dispatch(
        updateClientData({
          ...clientData,
          contacts: [...clientData.contacts, { field: 'phone', value: '', type: 'tel', isValid: null }].map(generateId),
        })
      );
    }
  };

  const handleClickDeleteContact = (id: string) => {
    dispatch(updateClientData({ ...clientData, contacts: clientData.contacts.filter((contact) => contact.id !== id) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const personDataFields = (
      Object.values(clientData).filter((item) => !(item instanceof Array)) as Array<TField>
    ).every((item) => item.isValid);
    const contactDataFields = clientData.contacts.map((contact) => contact.isValid).every((item) => item === true);

    if ([personDataFields, contactDataFields].every((item) => item)) {
      setLoadingNewAndUpdatedClient(true);
      if (!params.id) {
        ApiServer.createClient(makeClientFromForm(clientData), token)
          .then((res: TServerResponseClient) => {
            if (res.error) throw res.error;

            reRequestClientList();
          })
          .catch((err) => {
            console.log(err);
            setLoadingNewAndUpdatedClient(false);
          });
      } else {
        ApiServer.updateClient(params.id, makeClientFromForm(clientData), token)
          .then((res: TServerResponseClient) => {
            if (res.error) throw res.error;
            reRequestClientList();
          })
          .catch((err) => {
            console.log(err);
            setLoadingNewAndUpdatedClient(false);
          });
      }
    }
  };

  const reRequestClientList = () => {
    setLoadingNewAndUpdatedClient(false);
    dispatch(getClientList()).then(() => {
      handleCloseModal();
    });
  };

  const handleCloseModal = () => {
    dispatch(updateModalState(false));
    navigate('/contacts');
  };

  return (
    <Modal onClose={handleCloseModal}>
      {loading && <CircularProgress />}
      {!loading && (
        <ClientForm
          loading={loadingNewAndUpdatedClient}
          onChangeData={handleChangePersonDataValue}
          onChangeContactValue={handleChangeContactValue}
          onChangeContactField={handleChangeContactField}
          onAddContact={handleClickAddContact}
          onDeleteContact={handleClickDeleteContact}
          onSubmitForm={handleSubmit}
          validation={validationData}
        />
      )}
    </Modal>
  );
}
