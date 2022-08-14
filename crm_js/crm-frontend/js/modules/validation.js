export function validation(inputFiled) {
  if (inputFiled.value.length < 3) {
    const invalidItem = document.createElement('span');
    invalidItem.textContent = 'Мин. кол-во символов - 3';
    inputFiled.before(invalidItem);
    invalidItem.classList.add('invalid-message', `${invalidItem.parentNode.className}__invalid`);

    inputFiled.classList.add('invalid-input');

    inputFiled.addEventListener('input', () => {
      if (inputFiled.value.length >= 3) {
        invalidItem.remove();
        inputFiled.classList.remove('invalid-input');
      }
    })
    return true;
  } else {
    return false;
  }
}
