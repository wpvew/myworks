import { setIdContactSelector } from './set-id-contact-selector.js';
import { createContactIcon } from './create-icons.js';

export function createContactField(insertElement, contactItemElement) {

  const contactItem = document.createElement('div');
  const contactSelect = document.createElement('select');
  const contactInput = document.createElement('input');
  const contactCloseBtn = document.createElement('button');

  contactItem.classList.add('contact');
  contactSelect.classList.add('contact__select');
  contactInput.classList.add('contact__input');
  contactCloseBtn.classList.add('contact__close-btn', 'reset');


  contactCloseBtn.setAttribute('type', 'button');
  contactCloseBtn.append(createContactIcon('close-contact').svgElem);


  contactCloseBtn.addEventListener('click', () => {
    contactItem.remove();
    if (document.querySelectorAll('.contact').length === 0) {
      document.querySelector('.addition-form__contact-wrap').classList.remove('active');
    }
    setIdContactSelector();
  })


  const selectOptionItems = [
    {optionValue: 'phone', textElement: 'Телефон'},
    {optionValue: 'add-tel', textElement: 'Доп. телефон'},
    {optionValue: 'email', textElement: 'Email'},
    {optionValue: 'vk', textElement: 'VK'},
    {optionValue: 'facebook', textElement: 'Facebook'},
  ]


  for (let i in selectOptionItems) {
    const selectOption = document.createElement('option');


    if (contactItemElement && selectOptionItems.find(option => option.optionValue === contactItemElement.type).optionValue === selectOptionItems[i].optionValue) {
      selectOption.setAttribute('selected', 'true');
    }

    selectOption.setAttribute('value', selectOptionItems[i].optionValue);
    selectOption.textContent = selectOptionItems[i].textElement;

    contactSelect.append(selectOption);
  }

  contactItem.append(contactSelect)
  contactItem.append(contactInput)
  contactItem.append(contactCloseBtn)

  insertElement.before(contactItem);

  setIdContactSelector();

  if(contactItemElement) {
    contactInput.value = contactItemElement.value;
  }

  document.querySelectorAll('.choices').forEach(choicesElement => {
    choicesElement.addEventListener('click', () => {
      document.querySelectorAll('.choices__item').forEach(choicesItemElement => {
        if (choicesItemElement.classList.contains('is-selected')) {
          document.querySelector('.is-selected').remove();
        }
      })
    })
  })


  if(document.querySelectorAll('.contact').length >= 10) {
    insertElement.classList.add('visually-hidden');
  }

  contactCloseBtn.addEventListener('click', () => {
    insertElement.classList.remove('visually-hidden');
  })

  return { selectOptionItems, contactInput }
}
