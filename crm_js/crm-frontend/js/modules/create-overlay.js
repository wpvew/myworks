import { removeOverlay } from './remove-overlay.js';



export function createOverlay() {
  const overlay = document.createElement('div');
  const modal = document.createElement('div');
  const btnCloseModal = document.createElement('button');
  const btnCloseModalx = document.createElement('span');

  document.querySelector('body').style.overflow = 'hidden';


  overlay.classList.add('overlay');
  modal.classList.add('modal');
  btnCloseModal.classList.add('modal__close-btn', 'reset');
  btnCloseModalx.classList.add('modal__close-btn-x');

  btnCloseModal.append(btnCloseModalx);
  modal.append(btnCloseModal);
  overlay.append(modal);

  setTimeout(() => {
    overlay.classList.add('animation');
  }, 1)

  // modal.style.transform = 'translateY(100%)';
  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) {
      removeOverlay(overlay);
    }
  })

  btnCloseModal.addEventListener('click', () => {
    removeOverlay(overlay);
  })


  return { overlay, modal };
}
