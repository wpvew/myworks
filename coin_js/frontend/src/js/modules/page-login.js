import { WorkApi } from './WorkApi';
import { setChildren } from 'redom';
import { errProcessingAutorization } from './err-process';

export async function pageModule(header) {
  history.pushState(null, null, '/autorization');

  const renderPageLogin = (await import('./render-pages.js')).pageLogin();
  setChildren(document.body, [header.header, renderPageLogin.main]);

  renderPageLogin.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (renderPageLogin.inputs.login.value.length < 6) {
      errProcessingAutorization('Invalid login', renderPageLogin.inputs);
      return;
    }

    if (renderPageLogin.inputs.password.value.length < 6) {
      errProcessingAutorization('Invalid password', renderPageLogin.inputs);
      return;
    }

    const dataLoginApi = await WorkApi.autorization(
      renderPageLogin.inputs.login.value,
      renderPageLogin.inputs.password.value
    );

    if (dataLoginApi.error) {
      errProcessingAutorization(dataLoginApi.error, renderPageLogin.inputs);
    } else {
      localStorage.setItem('dataLoginApi', JSON.stringify(dataLoginApi));
      localStorage.setItem('autorizated', true);
      location.pathname = '/profile';
    }
  });

  Object.values(renderPageLogin.inputs).forEach((input) => {
    input.addEventListener('input', () => {
      if (input.parentNode.querySelector('.invalid-msg')) {
        input.parentNode.querySelector('.invalid-msg').remove();
        input.classList.remove('invalid-input');
      }
    });
  });
}
