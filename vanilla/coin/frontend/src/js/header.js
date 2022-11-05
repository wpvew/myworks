import { el, setChildren } from 'redom';
import { actionOpenPage } from './modules/action';

export default function header() {
  const parentClass = 'header';
  const header = el(`header.${parentClass}`);
  const container = el(`.container.${parentClass}__container`);

  const title = el(`h1.${parentClass}__title`, 'Coin.');
  const btnLogo = el(`a.${parentClass}__btn-logo`, { href: '/profile' }, title);
  const btnLogout = el(
    `button.${parentClass}__btns.${parentClass}__btn-logout`,
    { 'data-page': 'page-login' },
    'Выход'
  );
  const btnAccounts = el(
    `button.${parentClass}__btns.${parentClass}__btn-accounts`,
    { 'data-page': 'page-profile' },
    'Счета'
  );
  const btnCurrency = el(
    `button.${parentClass}__btns.${parentClass}__btn-currency`,
    { 'data-page': 'page-currencies' },
    'Валюта'
  );
  const btnBanks = el(
    `button.${parentClass}__btns.${parentClass}__btn-banks`,
    { 'data-page': 'page-banks' },
    'Банкоматы'
  );

  const menuBtns = { btnBanks, btnCurrency, btnAccounts, btnLogout };

  const btnWrapper = el(
    `.${parentClass}__menu-wrapper`,
    el(
      `ul.${parentClass}__menu`,
      Object.values(menuBtns).map((item) => {
        if (item === btnLogo) return;
        return el(`li.${parentClass}__menu-item`, item);
      })
    )
  );

  const burger = el(`button.${parentClass}__burger`, [
    el('span.burger-item'),
    el('span.burger-item'),
    el('span.burger-item'),
  ]);

  setChildren(container, [
    btnLogo,
    window.innerWidth <= 769 && localStorage.getItem('autorizated')
      ? burger
      : '',
    localStorage.getItem('autorizated') ? btnWrapper : '',
  ]);

  window.addEventListener('resize', () => {
    if (
      window.innerWidth <= 768 &&
      !document.querySelector('.header__burger') &&
      localStorage.getItem('autorizated')
    ) {
      btnLogo.after(burger);
    } else if (
      window.innerWidth >= 769 &&
      document.querySelector('.header__burger')
    ) {
      document.querySelector('.header__burger').remove();
    }
  });

  setChildren(header, container);

  Object.entries(menuBtns).forEach((menuBtn) => {
    menuBtn[1].addEventListener('click', function () {
      if (window.sock) {
        window.sock.socket.close();
      }

      document
        .querySelector('.header__menu-wrapper')
        .classList.toggle('active');

      actionOpenPage(
        { header, [menuBtn[0]]: this },
        menuBtn[1].getAttribute('data-page')
      );
    });
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    document.querySelector('.header__menu-wrapper').classList.toggle('active');
  });

  return { header, btnLogout, btnCurrency, btnBanks, btnAccounts };
}
