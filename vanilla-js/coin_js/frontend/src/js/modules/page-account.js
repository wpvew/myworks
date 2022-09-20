import { el, setChildren } from 'redom';
import { WorkApi } from './WorkApi';
import { validRestiction } from './validation';
import { actionTransfer } from './action';

export async function pageModule(header, link) {
  history.pushState(`./profile${link}`, null, `./profile${link}`);
  history.pushState(`${link}`, null, `./profile${link}`);

  if (document.querySelector('.header button[disabled]')) {
    document
      .querySelector('.header button[disabled]')
      .removeAttribute('disabled');
  }

  document.body.innerHTML = '';
  document.body.append(header.header);

  const params = new URLSearchParams(location.search);
  const accountId = params.get('acc');
  const page = params.get('page');

  const token = JSON.parse(localStorage.getItem('dataLoginApi')).payload.token;
  let accountDetails = await WorkApi.getAccount(accountId, token);

  const renderPageAccountDetails = (
    await import('./render-pages.js')
  ).pageAccountDetails(await accountDetails.payload, page);

  setChildren(document.body, [
    header.header,
    renderPageAccountDetails.renderPage(),
  ]);

  const skeleton = el('.wrapper', el('.skeleton skeleton-chart-columns'));
  new Promise((resolve) => {
    document.querySelector('.send-transfer').after(skeleton);
    setTimeout(
      () => resolve(renderPageAccountDetails.dinamicBalanceWindow(true)),
      1500
    );
  })
    .then((rend) => {
      const historyBalanceLink = el('a.history-balance-link', {
        href: `?page=balancehistory&acc=${accountId}`,
      });
      historyBalanceLink.append(rend);
      document.querySelector('.send-transfer').after(historyBalanceLink);
      historyBalanceLink.addEventListener('click', async (e) => {
        e.preventDefault();
        (await import('./page-balance-history.js')).pageModule(
          header,
          accountId
        );
      });
    })
    .finally(() => {
      skeleton.remove();
    });

  let dropAutoFill = renderPageAccountDetails.autoFill(
    localStorage.getItem(`rememberAcc${accountId}`)
      ? localStorage.getItem(`rememberAcc${accountId}`).split(',')
      : []
  );

  Object.values(renderPageAccountDetails.inputs).forEach((input) => {
    input.addEventListener('input', (e) => {
      if (renderPageAccountDetails.inputs.transferRecipient === e.target) {
        input.value = validRestiction(input.value, 'numeric');
        dropAutoFill.dropbox.remove();
        dropAutoFill = renderPageAccountDetails.autoFill(
          localStorage.getItem(`rememberAcc${accountId}`)
            ? localStorage
                .getItem(`rememberAcc${accountId}`)
                .split(',')
                .filter((item) => item.startsWith(input.value))
            : []
        );
        input.parentNode.append(dropAutoFill.dropbox);
      } else {
        input.value = validRestiction(input.value, 'cash');
      }

      if (input.parentNode.querySelector('.invalid-msg')) {
        input.parentNode.querySelector('.invalid-msg').remove();
        input.classList.remove('invalid-input');
      }
    });
  });

  renderPageAccountDetails.inputs.transferRecipient.addEventListener(
    'focus',
    function () {
      if (localStorage.getItem(`rememberAcc${accountId}`)) {
        this.parentNode.append(dropAutoFill.dropbox);
      }

      dropAutoFill.dropbox.addEventListener('click', (event) => {
        event._isClickWithinDropbox = true;
      });

      dropAutoFill.dropBoxItems.forEach((btn) => {
        btn.addEventListener('mousedown', (e) => {
          this.value = e.target.getAttribute('data-rem-acc');
          dropAutoFill.dropbox.remove();
          dropAutoFill = renderPageAccountDetails.autoFill(
            localStorage.getItem(`rememberAcc${accountId}`)
              ? localStorage
                  .getItem(`rememberAcc${accountId}`)
                  .split(',')
                  .filter((item) => item.startsWith(this.value))
              : []
          );
        });
      });

      this.addEventListener('blur', (event) => {
        if (event._isClickWithinDropbox) return;
        dropAutoFill.dropbox.remove();
      });
    }
  );

  renderPageAccountDetails.btnTransfer.addEventListener('click', async () => {
    await actionTransfer(
      renderPageAccountDetails,
      accountId,
      token,
      accountDetails
    );
    dropAutoFill = renderPageAccountDetails.autoFill(
      localStorage.getItem(`rememberAcc${accountId}`)
        ? localStorage
            .getItem(`rememberAcc${accountId}`)
            .split(',')
            .filter((item) => item.startsWith(this.value))
        : []
    );
  });

  renderPageAccountDetails.btnBack.addEventListener('click', async () => {
    (await import('./page-profile.js')).pageModule(header);
  });
}
