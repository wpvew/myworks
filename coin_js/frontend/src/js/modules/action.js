import { setChildren } from 'redom';
import { WorkApi } from './WorkApi';
import { errProcessingExchange, errProcessingTransfer } from './err-process';

export async function actionOpenPage(header, page) {
  if (page === 'page-login') {
    localStorage.setItem('autorizated', '');
    localStorage.setItem('dataLoginApi', '');
    location.pathname = '/autorization';
    return;
  }
  if (document.querySelector('.header button[disabled]')) {
    document
      .querySelector('.header button[disabled]')
      .removeAttribute('disabled');
  }

  (await import(`./${page}.js`)).pageModule(header);
}

export async function actionCreateNewAccount() {
  const newBill = await WorkApi.createAccount(
    JSON.parse(localStorage.getItem('dataLoginApi')).payload.token
  );
  console.log([await newBill.payload]);
  const renderNewBill = (await import('./render-pages.js')).getAccountList([
    await newBill.payload,
  ]);
  document.querySelector('.accounts__list').append(renderNewBill[0]);
}

export async function actionSortBills(clickedElement) {
  const bills = await WorkApi.getAccounts(
    JSON.parse(localStorage.getItem('dataLoginApi')).payload.token
  );
  document.querySelector('.accounts__list').innerHTML = '';

  switch (clickedElement.target.getAttribute('data-value')) {
    case window.selectorValues.account:
      renderSortedBills('account');
      break;
    case window.selectorValues.balance:
      renderSortedBills('balance');
      break;
    case window.selectorValues.transactions:
      renderSortedBills('transactions');
      break;
  }
  async function renderSortedBills(sortByElement) {
    setChildren(
      document.querySelector('.accounts__list'),
      (await import('./render-pages.js')).getAccountList(
        await bills.payload.sort(
          sortByElement !== window.selectorValues.transactions
            ? (a, b) => b[sortByElement] - a[sortByElement]
            : (a, b) =>
                b[sortByElement][0]?.date.split('T')[0].split('-').join('') -
                a[sortByElement][0]?.date.split('T')[0].split('-').join('')
        )
      )
    );
  }
}

export async function actionExchangeCurrencies(renderPageCurrency, token) {
  if (renderPageCurrency.input.value <= 0) {
    errProcessingExchange('Invalid amount', renderPageCurrency.input);
    return;
  }
  const amount = renderPageCurrency.input.value;
  const from = renderPageCurrency.selectors.selectorFrom.value;
  const to = renderPageCurrency.selectors.selectorTo.value;
  const exchanged = await WorkApi.exchangeCurrency(from, to, amount, token);

  if (exchanged.error) {
    errProcessingExchange(exchanged.error, renderPageCurrency.input);
  } else {
    document.querySelector('.currency-exchange').classList.add('success');
    setTimeout(
      () =>
        document
          .querySelector('.currency-exchange')
          .classList.remove('success'),
      2000
    );
    renderPageCurrency.input.value = '';

    let currencyData = await WorkApi.getCurrencyAccounts(token);
    const renderCurrencyAccList = (
      await import('./render-pages.js')
    ).currencyAccList(await currencyData.payload);

    setChildren(
      document.querySelector('.currency-accounts__list'),
      renderCurrencyAccList.map((item) => item)
    );
  }
}

export async function actionTransfer(
  renderPageAccountDetails,
  accountId,
  token,
  accountDetails
) {
  if (renderPageAccountDetails.inputs.transferAmount.value <= 0) {
    errProcessingTransfer('Invalid amount', renderPageAccountDetails.inputs);
    return;
  }
  const transfer = await WorkApi.transferFunds(
    accountId,
    renderPageAccountDetails.inputs.transferRecipient.value,
    Number(
      Number(renderPageAccountDetails.inputs.transferAmount.value).toFixed(2)
    ),
    token
  );

  if (transfer.error) {
    errProcessingTransfer(transfer.error, renderPageAccountDetails.inputs);
  } else {
    document.querySelector('.send-transfer').classList.add('success');
    setTimeout(
      () =>
        document.querySelector('.send-transfer').classList.remove('success'),
      2000
    );

    let remAcc = new Set();
    if (localStorage.getItem(`rememberAcc${accountId}`)) {
      remAcc = new Set([
        ...localStorage.getItem(`rememberAcc${accountId}`).split(','),
      ]);
    }
    remAcc.add(renderPageAccountDetails.inputs.transferRecipient.value);
    if (remAcc.size > 5) remAcc.delete(Array.from(remAcc)[0]);
    localStorage.setItem(`rememberAcc${accountId}`, Array.from(remAcc));

    renderPageAccountDetails.inputs.transferRecipient.value = '';
    renderPageAccountDetails.inputs.transferAmount.value = '';

    accountDetails = await WorkApi.getAccount(accountId, token);
    document.querySelector(
      '[data-account-balance]'
    ).innerHTML = `${accountDetails.payload.balance} P`;

    document.querySelector('.transfer').remove();
    document
      .querySelector('.history-translates')
      .append(
        renderPageAccountDetails.tableTransferHistory(accountDetails.payload)
      );
  }
}
