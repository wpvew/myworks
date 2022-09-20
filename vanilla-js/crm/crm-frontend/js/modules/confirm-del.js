import { removeOverlay } from './remove-overlay.js';

export function confirmationDeletion(modalOverlay) {
  const deletionBlock = document.createElement('div');
  const titleDeletion = document.createElement('h2');
  const textDeletion = document.createElement('p');
  const btnDeletion = document.createElement('button');
  const btnCancel = document.createElement('button');

  deletionBlock.classList.add('deletion-window');
  titleDeletion.classList.add('deletion-window__title');
  textDeletion.classList.add('deletion-window__text');
  btnDeletion.classList.add('deletion-window__btn-confirm', 'reset');
  btnCancel.classList.add('deletion-window__btn-cancel', 'reset');

  titleDeletion.textContent = 'Удалить клиента';
  textDeletion.textContent = 'Вы действительно хотите удалить данного клиента?';
  btnDeletion.textContent = 'Удалить';
  btnCancel.textContent = 'Отмена';

  deletionBlock.append(titleDeletion);
  deletionBlock.append(textDeletion);
  deletionBlock.append(btnDeletion);
  deletionBlock.append(btnCancel);
  modalOverlay.modal.append(deletionBlock);

  btnCancel.addEventListener('click', () => {
    removeOverlay(modalOverlay.overlay);
  })

  return { btnDeletion };
}
