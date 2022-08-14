import { createContactIcon } from './create-icons.js';
import { removeOverlay } from './remove-overlay.js';

export function createForm(modalWindow, client, handlers, elementToBeRemoved) {
  const form = document.createElement('form');
  const formTitle = document.createElement('h2');
  const inputSurname = document.createElement('input');
  const inputFirstName = document.createElement('input');
  const inputLastName = document.createElement('input');
  const btnAdditionContact = document.createElement('button');
  const btnAdditionContactWrap = document.createElement('div');
  const btnSave = document.createElement('button');
  const btnCancel = document.createElement('button');
  const inputs = [
    {title: 'Фамилия', inputField: inputSurname, inputData: 'surname'},
    {title: 'Имя', inputField: inputFirstName, inputData: 'name'},
    {title: 'Отчество', inputField: inputLastName, inputData: 'lastName'},
  ]

  btnCancel.classList.add('addition-form__cancel-btn', 'reset');
  btnAdditionContactWrap.classList.add('addition-form__contact-wrap');
  btnAdditionContact.classList.add('addition-form__addition-contact', 'reset');
  btnSave.classList.add('addition-form__save-btn', 'reset');
  btnAdditionContact.setAttribute('type', 'button');
  btnCancel.setAttribute('type', 'button');
  btnSave.setAttribute('type', 'submit');
  form.classList.add('addition-form');
  formTitle.classList.add('addition-form__title')

  // console.log(elementToBeRemoved);

  form.append(formTitle);

  for (let input of inputs) {
    const inputGroup = document.createElement('div');
    const inputTitle = document.createElement('span');

    inputTitle.classList.add('addition-form__input-title');
    inputGroup.classList.add('input-group');
    input.inputField.classList.add('addition-form__input');

    input.inputField.setAttribute('type', 'text');
    input.inputField.setAttribute('name', input.title);

    inputTitle.textContent = input.title;
    inputTitle.setAttribute('data-input-title', input.inputData);

    if (input.inputData === 'surname' || input.inputData === 'name') {
      const requiredMark = document.createElement('span');
      requiredMark.classList.add('addition-form__required-mark');
      requiredMark.textContent = '*';
      inputTitle.append(requiredMark);
    }

    inputGroup.append(inputTitle);
    inputGroup.append(input.inputField);
    form.append(inputGroup);
  }

  if(client) {
    const identificator = document.createElement('span');
    identificator.classList.add('client-id');
    identificator.textContent = `ID: ${client.id}`
    form.append(identificator)

    formTitle.textContent = 'Изменить данные'; //

    inputs.find(input => input.inputData === 'surname').inputField.value = client.surname;
    inputs.find(input => input.inputData === 'name').inputField.value = client.name;
    inputs.find(input => input.inputData === 'lastName').inputField.value = client.lastName;

    btnCancel.textContent = 'Удалить клиента'

  } else {
    formTitle.textContent = 'Новый клиент'; //
    btnCancel.textContent = 'Отменить';
  }

  btnAdditionContact.textContent = 'Добавить контакт';
  btnSave.textContent = 'Сохранить';


  btnAdditionContact.prepend(createContactIcon('add-contact').svgElem);

  btnAdditionContactWrap.append(btnAdditionContact)
  form.append(btnAdditionContactWrap);
  form.append(btnSave);
  form.append(btnCancel);
  modalWindow.modal.append(form);

  btnCancel.addEventListener('click', () => {
    if (client) {
     handlers.onDelete({client, element: elementToBeRemoved});
    }
    removeOverlay(modalWindow.overlay);
  })

  return { form, inputs, btnAdditionContact, btnSave,  btnAdditionContactWrap};
}
