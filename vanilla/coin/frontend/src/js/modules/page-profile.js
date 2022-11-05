import { setChildren } from 'redom';
import { WorkApi } from './WorkApi';
import { actionCreateNewAccount, actionSortBills } from './action';

export async function pageModule(header) {
  history.pushState('/', null, '/profile');

  header.btnAccounts.setAttribute('disabled', true);

  const accounts = await WorkApi.getAccounts(
    JSON.parse(localStorage.getItem('dataLoginApi')).payload.token
  );

  const renderPageAccountList = (await import('./render-pages.js')).pageAccount(
    await accounts.payload
  );
  setChildren(document.body, [header.header, renderPageAccountList.main]);

  renderPageAccountList.addNewAccountBtn.addEventListener(
    'click',
    actionCreateNewAccount
  );

  // eslint-disable-next-line no-undef
  new Choices(renderPageAccountList.selectorSorting, {
    searchEnabled: false,
    itemSelectText: '',
    resetScrollPosition: false,
    duplicateItemsAllowed: false,
  });

  document
    .querySelector('.choices__list--dropdown')
    .addEventListener('mousedown', (e) => actionSortBills(e));

  document.querySelectorAll(`a.my-bill__btn-open`).forEach((elem) => {
    elem.addEventListener('click', async (e) => {
      e.preventDefault();
      const link = e.target.getAttribute('href');
      (await import('./page-account.js')).pageModule(header, link);
    });
  });
}
