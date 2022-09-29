import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { serverAPI, TServerResponse } from '../../../API/serverAPI';
import { updataClientListDataSuccess } from '../../../store/clientList/action';
import { TRootState } from '../../../store/storeRedux';
import { validationEmail, validationNumber, validationString } from '../../utils/validation';
import { ManagementClient } from './ManagementClient';

export type TContact = {
  type: string,
  name: string,
  value: string
}

export type TClientData = {
  surname: string,
  name: string,
  lastName: string,
  contacts: Array<TContact>
}

export type TIsCorrectData = {
  surname: null | boolean,
  name: null | boolean,
  lastName: null | boolean,
  tel: null | boolean,
  email: null | boolean,
}

export function ManagementClientContainer() {
  const token = useSelector<TRootState, string>(state => state.token);
  const dispatch = useDispatch()
  const params = useParams() as {id: string, [N: string]: string}
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false)
  const [isCorrectData, setIsCorrectData] = useState<TIsCorrectData>({surname: null, name: null, lastName: null, tel: null, email: null})
  const [clientData, setClientData] = useState<TClientData>({
    surname: '',
    name: '',
    lastName: '',
    contacts: [
      {type: 'tel', name: 'Телефон', value: ''},
      {type: 'email', name: 'Email', value: ''}
    ]
  })

  useEffect(() => {
    if(params.id !== 'create') {
      serverAPI.getClient(params.id, token).then((res: TServerResponse) => {
        if(res.error) throw res.error
        const clientResponseData: TClientData = {
          surname: res.data['surname'],
          name: res.data['name'],
          lastName: res.data['lastName'],
          contacts: res.data['contacts'],
        }
        setClientData(clientResponseData)
      }).catch(err => console.log(err))
    }
  }, [])

  useEffect(() => {
    setIsMounted(true);
    if(isMounted && isCorrectData.surname !== null) {
      validationData()
    }
  }, [clientData])

  const validationData = () => {
    const phoneLength = (clientData.contacts.find(contact => contact.type === 'tel')?.value || '').length;

    setIsCorrectData({
      surname: clientData.surname.length > 2,
      name: clientData.name.length > 2,
      lastName: clientData.lastName.length > 2,
      tel: phoneLength < 12 && phoneLength > 6 ,
      email: validationEmail(clientData.contacts.find(contact => contact.type === 'email')?.value || ''),
    })
  }
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(params.id === 'create') {
      if(Object.values(isCorrectData).reduce((total, item) => total && item)) {
        serverAPI.createClient(clientData, token).then((res: TServerResponse) => {
          if(res.error) throw res.error;
          reRequestClientList();
        }).catch(err => console.log(err))
      }
    } else {
      if(Object.values(isCorrectData).reduce((total, item) => total && item)) {
        serverAPI.updateClient(params.id, clientData, token).then((res: TServerResponse) => {
          if(res.error) throw res.error;
          reRequestClientList();
        }).catch(err => console.log(err))
      }
    }
  }

  const handleClick = () => {
    validationData()
  }

  const reRequestClientList = () => {
    serverAPI.getClientList(token).then((res: TServerResponse) => {
      if (res.error) throw res.error
      dispatch(updataClientListDataSuccess(res.data))
    }).catch(err => console.log(err));

    handleCloseModal()
  }

  const handleChangeContactInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    const newContact: TContact = clientData.contacts.find(contact => contact.type === type) as TContact
    if (type === 'tel') {
      newContact.value = validationNumber(e.target.value)
    } else {
      newContact.value = e.target.value
    }
    setClientData({...clientData, contacts: [...clientData.contacts.filter(contacts => contacts.type !== type), newContact]})
  }

  const handleChangeNameInput = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    setClientData({...clientData, [type]: validationString(e.target.value)})
  }

  const handleCloseModal = () => {
    navigate('/contacts')
  }

  return (
    <ManagementClient
      clientData={clientData}
      submitForm={handleSubmit}
      create={handleClick}
      update={handleClick}
      changeContact={handleChangeContactInput}
      changeName={handleChangeNameInput}
      isCorrectData={isCorrectData}
      closeModal={handleCloseModal}
    />
  );
}
