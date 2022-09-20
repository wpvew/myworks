import { el, setChildren } from 'redom';
import { WorkApi } from './WorkApi';

export async function pageModule(header, accountId) {
  history.pushState(
    `?page=balancehistory&acc=${accountId}`,
    null,
    `./profile?page=balancehistory&acc=${accountId}`
  );

  const params = new URLSearchParams(location.search);
  const page = params.get('page');

  const token = JSON.parse(localStorage.getItem('dataLoginApi')).payload.token;
  let accountDetails = await WorkApi.getAccount(accountId, token);

  const renderPageAccountHistory = (
    await import('./render-pages.js')
  ).pageAccountDetails(await accountDetails.payload, page);

  const main = renderPageAccountHistory.renderPage();

  setChildren(document.body, [header.header, main]);

  const skeletons = [];
  for (let i = 0; i < 2; i++) {
    const skeleton = el(
      '.wrapper.wrapper-history',
      el('.skeleton skeleton-chart-columns')
    );
    skeletons.push(skeleton);
  }

  new Promise((resolve) => {
    skeletons.forEach((skeleton) =>
      document.querySelector('.history-translates').before(skeleton)
    );
    setTimeout(
      () =>
        resolve([
          renderPageAccountHistory.dinamicBalanceWindow(true),
          renderPageAccountHistory.dinamicBalanceWindow(false),
        ]),
      1500
    );
  })
    .then((rend) => {
      rend.forEach((item) =>
        document.querySelector('.history-translates').before(item)
      );
    })
    .finally(() => {
      skeletons.forEach((skeleton) => skeleton.remove());
    });

  renderPageAccountHistory.btnBack.addEventListener('click', async () => {
    (await import('./page-account.js')).pageModule(
      header,
      `?page=accountdetail&acc=${accountId}`
    );
  });
}
