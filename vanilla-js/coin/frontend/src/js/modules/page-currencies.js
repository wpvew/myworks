import { setChildren } from 'redom';
import { WorkApi } from './WorkApi';
import { validRestiction } from './validation';
import { actionExchangeCurrencies } from './action';

export async function pageModule(header) {
  history.pushState(`?page=currency`, 'currency', `./profile?page=currency`);
  header.btnCurrency.setAttribute('disabled', true);

  const token = JSON.parse(localStorage.getItem('dataLoginApi')).payload.token;
  let currencyData = await WorkApi.getCurrencyAccounts(token);

  const renderPageCurrency = (await import('./render-pages.js')).pageCurrencies(
    await currencyData.payload
  );

  setChildren(document.body, [header.header, renderPageCurrency.main]);

  const socket = await WorkApi.getChangedCurrency();
  socket.onmessage = async function (event) {
    const renderChangingItemCurrency = (
      await import('./render-pages.js')
    ).changingCurrencies(JSON.parse(event.data));
    document
      .querySelector('.currency-status__list')
      .prepend(renderChangingItemCurrency);
  };

  window.sock = { socket };

  // window.sock[socket.close()];

  const currencies = await WorkApi.getKnownCurrwncies();
  Object.values(renderPageCurrency.selectors).forEach(async (selector) => {
    setChildren(
      selector,
      (await import('./render-pages.js')).setExchangeOptions(
        await currencies.payload
      )
    );
    // eslint-disable-next-line no-undef
    new Choices(selector, {
      searchEnabled: false,
      itemSelectText: '',
      resetScrollPosition: false,
      duplicateItemsAllowed: false,
    });
  });

  renderPageCurrency.input.addEventListener('input', function () {
    this.value = validRestiction(this.value, 'cash');
    if (document.querySelector('.invalid-msg')) {
      this.classList.remove('invalid-input');
      document.querySelector('.invalid-msg').remove();
    }
  });

  renderPageCurrency.formExchange.addEventListener('submit', async (e) => {
    e.preventDefault();
    actionExchangeCurrencies(renderPageCurrency, token);
  });
}
