import { createContactIcon } from './create-icons.js';

export function createTableHeader(table) {
  const tableHeader = document.createElement('ul');
  const tableTitle = [
    {title: 'ID', dataAttr: 'client-id'},
    {title: 'Фамилия Имя Отчество', dataAttr: 'client-FIO'},
    {title: 'Дата и время создания', dataAttr: 'client-create-date'},
    {title: 'Последние изменения', dataAttr: 'client-change-date'},
    {title: 'Контакты', dataAttr: 'client-contacts'},
    {title: 'Действия', dataAttr: 'client-action'},
  ]

  tableHeader.classList.add('clients-header', 'reset');

  for (let item of tableTitle) {
    const tableHeaderElement = document.createElement('li');
    const tableTitleWrap = document.createElement('span');
    const tableHeaderBtnSort = document.createElement('button');

    tableHeaderElement.classList.add('clients-header__item');
    // tableTitleWrap.classList.add('clients-header__title-wrap');
    tableHeaderBtnSort.classList.add('clients-header__btn-sort', 'reset');


    tableTitleWrap.textContent = item.title;

    if(item.dataAttr != 'client-contacts' && item.dataAttr != 'client-action') {
      tableTitleWrap.classList.add('clients-header__title-wrap');
      tableTitleWrap.append(tableHeaderBtnSort)
      tableTitleWrap.append(createContactIcon('sort-arrow').svgElem);
    }

    if (item.dataAttr === 'client-id') {
      tableHeaderBtnSort.classList.add('sort-up');
      tableHeaderBtnSort.parentNode.classList.add('active');
    }

    if (item.dataAttr === 'client-FIO') {
      const alphabetSort = document.createElement('span');
      alphabetSort.classList.add('alphabet-sort');
      alphabetSort.textContent = 'А-Я';
      tableTitleWrap.append(alphabetSort);
    }

    tableHeaderBtnSort.setAttribute('data-title', item.dataAttr);

    tableHeaderElement.append(tableTitleWrap);
    tableHeader.append(tableHeaderElement);
  }

  table.prepend(tableHeader);

  return { tableTitle }
}
