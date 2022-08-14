import { createContactIcon } from './create-icons.js';

export function addNewClient(table, client, { onChange, onDelete }) {
  const tableRow = document.createElement('div');
  const clientID = document.createElement('div');
  const clientFIO = document.createElement('div');
  const createDate = document.createElement('div');
  const createDateTime = document.createElement('span');
  const changeDate = document.createElement('div');
  const changeDateTime = document.createElement('span');
  const contacts = document.createElement('ul');
  const action = document.createElement('div');
  const actionChangeBtn = document.createElement('button');
  const actionChangeBtnHrefWrap = document.createElement('a');
  const actionDeleteBtn = document.createElement('button');

  createDate.classList.add('create-date');
  changeDate.classList.add('change-date');

  createDateTime.classList.add('time');
  changeDateTime.classList.add('time');

  createDate.textContent = client.createdAt.split('T')[0].split('-').reverse().join('.');
  changeDate.textContent = client.updatedAt.split('T')[0].split('-').reverse().join('.');

  createDateTime.textContent = client.createdAt.split('T')[1].split('.')[0].split(':').splice(0, 2).join(':');
  changeDateTime.textContent = client.updatedAt.split('T')[1].split('.')[0].split(':').splice(0, 2).join(':');

  createDate.append(createDateTime);
  changeDate.append(changeDateTime);

  // кнопки "Изменить", "Удалить"
  action.classList.add('client-action');
  actionChangeBtn.classList.add('client-action__change', 'reset');
  actionDeleteBtn.classList.add('client-action__delete', 'reset');

  actionChangeBtnHrefWrap.classList.add('client-action__change-wrap', 'reset');
  actionChangeBtnHrefWrap.setAttribute('href', `#${client.id}`);
  actionChangeBtnHrefWrap.append(actionChangeBtn);

  actionChangeBtn.textContent = 'Изменить';
  actionDeleteBtn.textContent = 'Удалить';
  actionChangeBtn.prepend(createContactIcon('pen').svgElem);
  actionDeleteBtn.prepend(createContactIcon('close-contact').svgElem);
  action.append(actionChangeBtnHrefWrap);
  action.append(actionDeleteBtn);

  // иконки контактов
  contacts.classList.add('contact-icons', 'reset');


  for (let i in client.contacts) {
    const contactItem = document.createElement('li');
    const contactItemBtn = document.createElement('button');

    contactItem.classList.add('contact-icons__item')
    contactItemBtn.classList.add('contact-icons__marker', 'js-tooltip-btn', 'reset');

    if (i > 3) {
      contactItem.classList.add('visually-hidden');
    }

    contactItemBtn.setAttribute('data-tippy-content', client.contacts[i].value)

    contactItem.append(contactItemBtn);
    contactItemBtn.append(createContactIcon(client.contacts[i].type).svgElem);
    contacts.append(contactItem);
  }

  if (client.contacts.length > 4) {
    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('contact-icons__show-more-btn', 'reset');
    showMoreBtn.textContent = `+${client.contacts.length - 4}`;
    contacts.append(showMoreBtn);

    showMoreBtn.addEventListener('click', () => {
      document.querySelectorAll('.contact-icons__item').forEach(contactIconElement => {
        contactIconElement.classList.remove('visually-hidden');
      })
      showMoreBtn.remove();
    })
  }



  const tableData = [clientID, clientFIO, createDate, changeDate, contacts, action];


  // проставление значений по каждому пункту о клиенте
  clientID.textContent = client.id;
  clientFIO.textContent = client.surname + ' ' + client.name + ' ' + client.lastName;


  // проставление классов и добавление каждой информации в строку клиента
  for (let item of tableData) {
    item.classList.add('table-data');
    tableRow.append(item);
  }

  // добавление клиента в таблицу
  tableRow.classList.add('table-row');
  tableRow.setAttribute('id', client.id)
  table.append(tableRow);

  actionDeleteBtn.addEventListener('click', () => {
    onDelete({client, element: tableRow})
  })

  tippy('.js-tooltip-btn', {
    allowHTML: true,
    maxWidth: 264,
    placement: 'top',
    arrow: true,
  });
}
