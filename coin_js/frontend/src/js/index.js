import '@/styles/style.scss';
import createHeader from './header';

(async () => {
  const header = createHeader();
  const url = location.search;
  pageLoader(header, url);

  window.addEventListener('popstate', (e) => {
    if (document.querySelector('.header button[disabled]')) {
      document
        .querySelector('.header button[disabled]')
        .removeAttribute('disabled');
    }
    const url = e.state;
    pageLoader(header, url);
  });
})();

async function pageLoader(header, url) {
  const searchParams = new URLSearchParams(url);
  const acc = searchParams.get('acc');

  if (localStorage.getItem('autorizated')) {
    switch (url) {
      case `?page=accountdetail&acc=${acc}`:
        (await import('./modules/page-account.js')).pageModule(
          header,
          `?page=accountdetail&acc=${acc}`
        );
        break;
      case `?page=balancehistory&acc=${acc}`:
        (await import('./modules/page-balance-history.js')).pageModule(
          header,
          // `?page=balancehistory&acc=${acc}`
          acc
        );
        break;
      case '?page=currency':
        (await import('./modules/page-currencies.js')).pageModule(header);
        break;
      case '?page=banks':
        (await import('./modules/page-banks.js')).pageModule(header);
        break;
      default:
        (await import('./modules/page-profile.js')).pageModule(header);
        break;
    }
  } else {
    (await import('./modules/page-login')).pageModule(header);
  }
}
