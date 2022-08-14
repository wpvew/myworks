import { createContactIcon } from './create-icons.js';

export function waitingResponse(clientId) {
  let btnWithPreloader = null;
  let btnWithPreloaderText = '';
  let preloaderColor = null;
  if (clientId) {
    btnWithPreloader = document.querySelector(`[href="#${clientId}"] .client-action__change`);
    btnWithPreloaderText = 'Изменить';
    preloaderColor = 'preloader-color-primary';
  } else {
    btnWithPreloader = document.querySelector(`.addition-form__save-btn`);
    btnWithPreloaderText = 'Сохранить'
    preloaderColor = 'preloader-color-white';
  }

  btnWithPreloader.innerHTML = `
    <div class="preloader-mini ${preloaderColor}" id="preloader-change-btn">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    ${btnWithPreloaderText}
    `
}

export function gotBackResponse(clientId) {
  if (clientId) {
    const btnWithPreloader = document.querySelector(`[href="#${clientId}"] .client-action__change`);
    btnWithPreloader.prepend(createContactIcon('pen').svgElem);
  } else {
    document.querySelector(`.addition-form__save-btn`);
  }

  document.querySelector('.preloader-mini').remove();
}
