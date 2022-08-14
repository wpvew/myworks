import { el } from 'redom';
import {
  AccountDetailsViewAccount,
  AccountDetailsViewHistoryBalance,
} from './AccountDetails';

export function pageLogin() {
  const parentClass = 'signin-form';
  const form = el(
    `form.${parentClass}#form-signin`,
    el(`h2.${parentClass}__title`, 'Вход в аккаунт')
  );
  const inputs = {};
  const btnEnter = el(`button.${parentClass}__btn`, 'Войти');

  for (let i = 0; i < 2; i++) {
    const input = el(
      `input.${parentClass}__input`,
      i === 0
        ? { id: 'login', placeholder: 'Login' }
        : { id: 'password', placeholder: 'Password', type: 'password' }
    );
    const inputTitle = el(
      `h3.${parentClass}__input-title`,
      i === 0 ? 'Логин' : 'Пароль'
    );

    form.append(el(`.${parentClass}__input-group`, [inputTitle, input]));

    inputs[input.id] = input;
  }

  form.append(btnEnter);
  const main = el('main.page-login', el('.container', form));

  return { main, form, inputs, btnEnter };
}

const pageTitleClass = 'page-title';
const parentClassBillItem = 'my-bill';
const parentClassBills = 'accounts';
export function pageAccount(accountsData) {
  const parentClassMain = 'page-accounts';
  const addNewAccountBtn = el(
    `button.${parentClassMain}__addition-btn`,
    'Создать новый счёт'
  );
  const accountList = getAccountList(accountsData);
  const selectorValues = {
    account: 'account',
    balance: 'balance',
    transactions: 'transactions',
  };

  const selectorSorting = el(
    `select.${parentClassMain}__selector-sort#selector-accounts`,
    { name: 'select' },
    [
      el('option', { placeholder: true }, 'Сортировка'),
      el('option', { value: selectorValues.account }, 'По номеру'),
      el('option', { value: selectorValues.balance }, 'По балансу'),
      el(
        'option',
        { value: selectorValues.transactions },
        'По последней транзакции'
      ),
    ]
  );

  const main = el(
    `main.${parentClassMain}`,
    el(`.container`, [
      el(`.${parentClassMain}__bar`, [
        el(`h2.${parentClassMain}__title.${pageTitleClass}`, `Ваши счета`),
        selectorSorting,
        addNewAccountBtn,
      ]),
      el(
        `.${parentClassBills}`,
        el(`ul.${parentClassBills}__list`, accountList)
      ),
    ])
  );
  window.selectorValues = selectorValues;
  return { main, addNewAccountBtn, accountList, selectorSorting };
}

export function getAccountList(accountsData) {
  const accountList = accountsData.map((bill) => {
    return el(
      `li.${parentClassBills}__item`,
      el(`article.${parentClassBillItem}`, [
        el(`h3.${parentClassBillItem}__bill-number`, `${bill.account}`),
        el(`span.${parentClassBillItem}__balance`, `${bill.balance} ₽`),
        el(`.${parentClassBillItem}__wrapper-bottom-items`, [
          el(`span.${parentClassBillItem}__text`, [
            el('span', 'Последняя транзакция:'),
            el(
              'span.last-trans-time',
              bill.transactions.length
                ? bill.transactions.map((transaction) =>
                    new Date(
                      transaction.date.split('T')[0].split('-')
                    ).toLocaleString('ru', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  )
                : '-'
            ),
          ]),
          el(
            `a.${parentClassBillItem}__btn-open`,
            { href: `?page=accountdetail&acc=${bill.account}` },
            'Открыть'
          ),
        ]),
      ])
    );
  });

  return accountList;
}

export function pageAccountDetails(billData, page) {
  return page === 'accountdetail'
    ? new AccountDetailsViewAccount(billData, page, 6)
    : new AccountDetailsViewHistoryBalance(billData, page, 12);
}

const parentClassCurrencyAccounts = 'currency-accounts';
const parentClassCurrencyItem = 'currency-item';
export function pageCurrencies(currenciesData) {
  const parentClassMain = 'page-currency';
  const parentClassCurrencyStatus = 'currency-status';
  const parentClassCurrencyExchenge = 'currency-exchange';
  const parentClassFromExchenge = 'exchange-form';

  const input = el(`input.${parentClassFromExchenge}__input`);

  const selectorFrom = el(
    `select.${parentClassFromExchenge}__select#selector-exc-from`
  );
  const selectorTo = el(
    `select.${parentClassFromExchenge}__select#selector-exc-to`
  );
  const selectors = { selectorFrom, selectorTo };

  const formExchange = el(`form.${parentClassFromExchenge}`, [
    el(`.${parentClassFromExchenge}__selectors`, [
      el(`.select-group`, [
        el(`span.${parentClassFromExchenge}__select-title`, 'Из'),
        selectors.selectorFrom,
      ]),
      el(`.select-group`, [
        el(`span.${parentClassFromExchenge}__select-title`, 'в'),
        selectors.selectorTo,
      ]),
    ]),
    el(
      `.${parentClassFromExchenge}__amount`,
      el(`.${parentClassFromExchenge}__input-group`, [
        el(`span.${parentClassFromExchenge}__input-title`, 'Сумма'),
        input,
      ])
    ),
    el(`button.${parentClassFromExchenge}__btn`, 'Обменять'),
  ]);

  const main = el(
    `main.${parentClassMain}`,
    el('.container', [
      el(`h2.${parentClassMain}__title.${pageTitleClass}`, 'Валютный обмен'),
      el(`.${parentClassMain}__grid-table`, [
        el(`.${parentClassCurrencyAccounts} ${parentClassMain}__grid-item`, [
          el(`h3.${parentClassCurrencyAccounts}__title`, 'Ваши валюты'),
          el(
            `ul.${parentClassCurrencyAccounts}__list`,
            currencyAccList(currenciesData).map((item) => item)
          ),
        ]),
        el(`.${parentClassCurrencyStatus} ${parentClassMain}__grid-item`, [
          el(
            `h3.${parentClassCurrencyStatus}__title`,
            'Изменение курсов в реальном времени'
          ),
          el(
            `.${parentClassCurrencyStatus}__window`,
            el(`ul.${parentClassCurrencyStatus}__list`)
          ),
        ]),
        el(`.${parentClassCurrencyExchenge} ${parentClassMain}__grid-item`, [
          el(`h3.${parentClassCurrencyExchenge}__title`, 'Обмен валюты'),
          formExchange,
        ]),
      ]),
    ])
  );
  return { main, formExchange, selectors, input };
}

export function currencyAccList(currenciesData) {
  return Object.values(currenciesData).map((currency) => {
    return el(`li.${parentClassCurrencyAccounts}__item`, [
      el(`.${parentClassCurrencyItem}`, [
        el(`span.${parentClassCurrencyItem}__name`, currency.code),
        el(`span.${parentClassCurrencyItem}__dotted`),
      ]),
      el(
        `.${parentClassCurrencyItem}`,
        el(`span.${parentClassCurrencyItem}__amount`, currency.amount)
      ),
    ]);
  });
}

export function setExchangeOptions(data) {
  return data.map((option) => el(`option`, { value: option }, option));
}

export function changingCurrencies(data) {
  const parentClassCurrencyStatus = 'currency-status';
  const parentClassCurrencyItem = 'currency-item';
  return el(`li.${parentClassCurrencyStatus}__item`, [
    el(`.${parentClassCurrencyItem}`, [
      el(`span.${parentClassCurrencyItem}__name`, `${data.from}/${data.to}`),
      el(
        `span.${parentClassCurrencyItem}__dotted ${
          data.change > 0 ? 'dotted-up' : 'dotted-down'
        }`
      ),
    ]),
    el(`.${parentClassCurrencyItem}`, [
      el(`span.${parentClassCurrencyItem}__amount`, data.rate),
      el(
        `span.${
          data.change > 0
            ? `${parentClassCurrencyItem}__arrow-up`
            : `${parentClassCurrencyItem}__arrow-down`
        }`
      ),
    ]),
  ]);
}

export function pageBanks() {
  const parentClassMain = 'page-banks';
  const main = el(
    `main.${parentClassMain}`,
    el('.container', [
      el(`h2.${parentClassMain}__title.${pageTitleClass}`, 'Карта банкоматов'),
      el(`.map#map`, { style: 'width: 100%; height: 728px' }),
    ])
  );
  return main;
}
