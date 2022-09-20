import { createTableHeader } from './modules/create-table-header.js';
import { createContactIcon } from './modules/create-icons.js';
import { setIdContactSelector } from './modules/set-id-contact-selector.js';
import { validation } from './modules/validation.js';
import { removeOverlay } from './modules/remove-overlay.js';
import { confirmationDeletion } from './modules/confirm-del.js';
import { createOverlay } from './modules/create-overlay.js';
import { createForm } from './modules/create-form.js';
import { addNewClient } from './modules/create-new-client.js';
import { createContactField } from './modules/create-contact-field.js';
import { waitingResponse, gotBackResponse } from './modules/request-response.js';
import { setOverlayPosition } from './modules/set-overlay-align-position.js';


const tableClients = document.querySelector('.table-clients');
const tableHeaderTitles = createTableHeader(tableClients);

document.addEventListener('DOMContentLoaded', async () => {
  const additionBtn = document.querySelector('.add-clients-btn');
  let additionForm = null;
  let overlayWindow = null;
  let arreyClients = [];
  let arreyContacts = [];

  let responseGetList = await fetch('http://localhost:3000/api/clients');
  let clientsList = await responseGetList.json();


  const handlers = {
    //функция изменения данных клиента
    async onChange({client, element}) {

      const responseClient = await fetch(`http://localhost:3000/api/clients/${client.id}`).then(waitingResponse(client.id));
      const clientItem = await responseClient.json().then(gotBackResponse(client.id));


      overlayWindow = createOverlay();
      tableClients.prepend(overlayWindow.overlay);



      additionForm = createForm(overlayWindow, clientItem, handlers, element);

      for (let input of additionForm.inputs) {
        document.querySelector(`[data-input-title="${input.inputData}"]`).classList.add('active');
      }

      for (let clientContact of client.contacts) {
        createContactField(additionForm.btnAdditionContact, clientContact);
        additionForm.btnAdditionContactWrap.classList.add('active');
      }

      additionForm.btnAdditionContact.addEventListener('click', () => {
        createContactField(additionForm.btnAdditionContact);
        additionForm.btnAdditionContactWrap.classList.add('active');
      })

      setOverlayPosition();

      additionForm.form.addEventListener('submit', async (e) => {
        e.preventDefault();

        arreyClients = {
          clientSurname: additionForm.inputs.find(client => client.title === 'Фамилия').inputField,
          clientName: additionForm.inputs.find(client => client.title === 'Имя').inputField,
          clientLastName: additionForm.inputs.find(client => client.title === 'Отчество').inputField,
        }

        arreyContacts = [];
        const contactElements = document.querySelectorAll('.contact');

        for (let i = 1; i <= contactElements.length; i++) {
          const getContactOption = document.querySelector(`#selector-contact${i} option`).getAttribute('value');
          const getContactInput = document.querySelector(`[data-contact-input="num_${i}"]`).value
          arreyContacts[arreyContacts.length] = {type: getContactOption, value: getContactInput};
        }

        await fetch(`http://localhost:3000/api/clients/${client.id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: arreyClients.clientName.value,
            surname: arreyClients.clientSurname.value,
            lastName: arreyClients.clientLastName.value,
            contacts: [
              ...arreyContacts
            ]
          }),
          headers: {'Content-Type': 'application/json'}
        }).then(waitingResponse());

        const responseAllClients = await fetch('http://localhost:3000/api/clients');
        const clientsList = await responseAllClients.json();

        document.querySelectorAll('.table-row').forEach((tableRowElement) => {
          tableRowElement.remove();
        });
        clientsList.forEach(clientItem => {
          addNewClient(tableClients, clientItem, handlers);
          if (clientsList.length - 1 === clientsList.indexOf(clientItem)) {
            gotBackResponse();
          }
        });

        overlayWindow.overlay.remove();
        location.hash = '';
      })

    },
    onDelete({client, element}) {
      overlayWindow = createOverlay();
      tableClients.prepend(overlayWindow.overlay);

      confirmationDeletion(overlayWindow).btnDeletion.addEventListener('click', async () => {
        element.remove();
        await fetch(`http://localhost:3000/api/clients/${client.id}`, {
          method: 'DELETE'
        })

        responseGetList = await fetch('http://localhost:3000/api/clients');
        clientsList = await responseGetList.json();

        overlayWindow.overlay.remove();
      })
    }
  }


  // формирование таблицы
  if (clientsList.length > 0) {
    clientsList.forEach(clientItem => {
      addNewClient(tableClients, clientItem, handlers);

      if (clientsList.length - 1 === clientsList.indexOf(clientItem)) {
        document.querySelector('#preloader').style.display = 'none';
      }
    })

      // открытие модального окна по хеш-части
    if (location.hash.length > 0) {
      const client = clientsList.find(client => client.id === `${location.hash.substr(1)}`);
      handlers.onChange({client});
    }

    window.addEventListener('hashchange', () => {
      if (location.hash) {
        const client = clientsList.find(client => client.id === `${location.hash.substr(1)}`);
        if (client) {
          handlers.onChange({client, element: document.getElementById(client.id)});
        }
      }
    })
  } else {
    document.querySelector('#preloader').style.display = 'none';
  }

  // открытие модального окна и добавление нового клиента
  additionBtn.addEventListener('click', async () => {
    overlayWindow = createOverlay();
    tableClients.prepend(overlayWindow.overlay);
    additionForm = createForm(overlayWindow);

    setOverlayPosition();

    arreyClients = {
      clientSurname: additionForm.inputs.find(client => client.title === 'Фамилия').inputField,
      clientName: additionForm.inputs.find(client => client.title === 'Имя').inputField,
      clientLastName: additionForm.inputs.find(client => client.title === 'Отчество').inputField,
    }

    // запись данных из формы в базу данных и в таблицу пользователя
    additionForm.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // валидация
      const arrayCheckedContactInputs = [];
      document.querySelectorAll('.contact__input').forEach(contactInputElement => {
        arrayCheckedContactInputs[arrayCheckedContactInputs.length] = validation(contactInputElement);
      })

      const arrayCheckedValidField = [
        validation(arreyClients.clientSurname),
        validation(arreyClients.clientName),
        ...arrayCheckedContactInputs
      ]

      if (arrayCheckedValidField.includes(true)) {
        return;
      }

      // запись данных из формы в базу данных
      arreyContacts = [];
      const contactElements = document.querySelectorAll('.contact');

      for (let i = 1; i <= contactElements.length; i++) {
        const getContactOption = document.querySelector(`#selector-contact${i} option`).getAttribute('value');
        const getContactInput = document.querySelector(`[data-contact-input="num_${i}"]`).value;
        arreyContacts[arreyContacts.length] = {type: getContactOption, value: getContactInput};
      }



      const responsePostClient = await fetch('http://localhost:3000/api/clients', {
        method: 'POST',
        body: JSON.stringify({
            name: arreyClients.clientName.value,
            surname: arreyClients.clientSurname.value,
            lastName: arreyClients.clientLastName.value,
            contacts: [
              ...arreyContacts
            ]
          }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(waitingResponse())

      // запись в таблицу
      const clientItem = await responsePostClient.json().then(gotBackResponse());
      addNewClient(tableClients, clientItem, handlers);

      // обновление переменной с даннами клиентов
      responseGetList = await fetch('http://localhost:3000/api/clients');
      clientsList = await responseGetList.json();

      overlayWindow.overlay.remove();

    })


    additionForm.btnAdditionContact.addEventListener('click', () => {
      createContactField(additionForm.btnAdditionContact);
      additionForm.btnAdditionContactWrap.classList.add('active');
      setOverlayPosition();
    })

    for (let input of additionForm.inputs) {
      input.inputField.addEventListener('focus', () => {
        document.querySelector(`[data-input-title="${input.inputData}"]`).classList.add('active');
      })
    }
  })


  // сортировка
  document.querySelectorAll('.clients-header__btn-sort').forEach(sortElement => {
    sortElement.addEventListener('click', async (sortElementClick) => {

      const attrClickElement = sortElementClick.target.getAttribute('data-title');

      document.querySelectorAll('.clients-header__btn-sort').forEach(clientHeaderbtn => {
        if (clientHeaderbtn.classList.contains('sort-up') || clientHeaderbtn.classList.contains('sort-down')) {
          const attrPreviousElement = clientHeaderbtn.getAttribute('data-title');

          if(attrPreviousElement != attrClickElement) {
            clientHeaderbtn.classList.remove('sort-up');
            clientHeaderbtn.classList.remove('sort-down');
          }
        }
      })

      document.querySelectorAll('.clients-header__title-wrap').forEach(wrapElement => wrapElement.classList.remove('active'));
      sortElement.parentNode.classList.add('active');


      if (!sortElementClick.target.classList.contains('sort-up')) {
        sortElementClick.target.classList.remove('sort-down');
        sortElementClick.target.classList.add('sort-up');
      } else {
        sortElementClick.target.classList.remove('sort-up');
        sortElementClick.target.classList.add('sort-down');
      }

      if (document.querySelector('[data-title="client-FIO"]').classList.contains('sort-down')) {
        document.querySelector('.alphabet-sort').textContent = 'Я-А';
      } else {
        document.querySelector('.alphabet-sort').textContent = 'А-Я';
      }

      responseGetList = await fetch('http://localhost:3000/api/clients');
      clientsList = await responseGetList.json();

      document.querySelectorAll('.table-row').forEach(clientRow => {
        clientRow.remove();
      })

      if (sortElementClick.target.classList.contains('sort-up')) {
        switch(sortElement.getAttribute('data-title')) {
          case tableHeaderTitles.tableTitle[0].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.id > clientB.id ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[1].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.surname + clientA.name + clientA.lastName > clientB.surname + clientB.name + clientB.lastName ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[2].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.createdAt > clientB.createdAt ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[3].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.updatedAt > clientB.updatedAt ? 1 : -1);
            break;
        }
      } else {
        switch(sortElement.getAttribute('data-title')) {
          case tableHeaderTitles.tableTitle[0].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.id < clientB.id ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[1].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.surname + clientA.name + clientA.lastName < clientB.surname + clientB.name + clientB.lastName ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[2].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.createdAt < clientB.createdAt ? 1 : -1);
            break;
          case tableHeaderTitles.tableTitle[3].dataAttr:
            clientsList.sort((clientA, clientB) => clientA.updatedAt < clientB.updatedAt ? 1 : -1);
            break;
        }
      }

      clientsList.forEach(clientElement => {
        addNewClient(tableClients, clientElement, handlers);
      })
    })
  })


// фильтрация по поиску
  const filterInput = document.querySelector('.search-input');
  let timeOut = null

  let filter = {};
  filterInput.addEventListener('input', () => {
    let arreyFilterClients = [];

    clearTimeout(timeOut);
    timeOut = setTimeout( async () => {
      filter = {
        clientFIO: filterInput.value
      }

      responseGetList = await fetch('http://localhost:3000/api/clients');
      clientsList = await responseGetList.json();

      arreyFilterClients = clientsList.filter(client => (client.name + client.surname + client.lastName).trim().toLowerCase().includes(filter.clientFIO.toLowerCase()));

      document.querySelectorAll('.table-row').forEach((clientRow) => {
        clientRow.remove();
      })

      arreyFilterClients.forEach(arreyFilterClientsElement => {
        addNewClient(tableClients, arreyFilterClientsElement, handlers);
      })
    }, 500)
  })
})



