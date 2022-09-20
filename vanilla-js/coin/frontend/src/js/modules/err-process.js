import { el } from 'redom';

export function errProcessingTransfer(errMsg, inputs) {
  const invalidMsg = el('span.invalid-msg');
  if (errMsg === 'Invalid account from') {
    console.log('Invalid account from');
  } else if (errMsg === 'Invalid account to') {
    invalidMsg.textContent = 'Данного счета не существует';
    if (inputs.transferRecipient.parentNode.querySelector('.invalid-msg'))
      return;
    inputs.transferRecipient.parentNode.append(invalidMsg);
    inputs.transferRecipient.classList.add('invalid-input');
  } else if (errMsg === 'Invalid amount' || errMsg === 'Overdraft prevented') {
    invalidMsg.textContent = 'Некорректная сумма';
    if (inputs.transferAmount.parentNode.querySelector('.invalid-msg')) return;
    inputs.transferAmount.parentNode.append(invalidMsg);
    inputs.transferAmount.classList.add('invalid-input');
  }
}

export function errProcessingExchange(errMsg, input) {
  if (input.parentNode.querySelector('.invalid-msg')) return;
  const invalidMsg = el('span.invalid-msg');
  if (errMsg === 'Unknown currency code') {
    invalidMsg.textContent = 'Передан неизвестный валютный код';
    input.parentNode.append(invalidMsg);
    input.classList.add('invalid-input');
  } else if (errMsg === 'Invalid amount' || errMsg === 'Overdraft prevented') {
    invalidMsg.textContent = 'Некорректная сумма';
    input.parentNode.append(invalidMsg);
    input.classList.add('invalid-input');
  } else if (errMsg === 'Not enough currency') {
    invalidMsg.textContent = 'На валютном счёте списания нет средств';
    input.parentNode.append(invalidMsg);
    input.classList.add('invalid-input');
  }
}

export function errProcessingAutorization(errMsg, inputs) {
  const invalidMsg = el('span.invalid-msg');
  if (errMsg === 'Invalid password') {
    invalidMsg.textContent = 'Некорректный пароль';
    if (inputs.password.parentNode.querySelector('.invalid-msg')) return;
    inputs.password.parentNode.append(invalidMsg);
    inputs.password.classList.add('invalid-input');
  } else if (errMsg === 'Invalid login') {
    invalidMsg.textContent = 'Некорректный логин (< 6)';
    if (inputs.login.parentNode.querySelector('.invalid-msg')) return;
    inputs.login.parentNode.append(invalidMsg);
    inputs.login.classList.add('invalid-input');
  } else if (errMsg === 'No such user') {
    invalidMsg.textContent = 'Такого пользователя не существует';
    if (inputs.login.parentNode.querySelector('.invalid-msg')) return;
    inputs.login.parentNode.append(invalidMsg);
    inputs.login.classList.add('invalid-input');
  }
}
