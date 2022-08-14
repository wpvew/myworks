  // validator
document.addEventListener('DOMContentLoaded', () => {

  if(document.querySelector(".appl-form")) {

    const modalReqIsSend = document.querySelector('.request-is-send');

    var selectorPhone = document.querySelector("input[type='tel']");

    var im = new Inputmask("+7(999)-999-99-99");
    im.mask(selectorPhone);

    var formIdTest = '#' + document.querySelector('.appl-form').getAttribute('id');

      const validation = new JustValidate(formIdTest, {
        errorFieldCssClass: 'is-invalid',
        errorLabelStyle: {
          color: 'red',
          textDecoration: 'underlined',
        }
      });

      validation
        .addField('#name', [
          {
            rule: 'required',
            errorMessage: 'Обязательное поле',
          },
          {
            rule: 'minLength',
            value: 3,
            errorMessage: 'Недопустимый формат',
          },
          {
            rule: 'maxLength',
            value: 30,
            errorMessage: 'Недопустимый формат',
          }
        ])
        .addField('#formPhone', [
          {
            rule: 'required',
            errorMessage: 'Обязательное поле',
          },
          {
            validator: (name, value) => {
              const phone = selectorPhone.inputmask.unmaskedvalue()
              return Number(phone) && phone.length === 10
            },

            errorMessage: 'Недопустимый формат'
          }
        ])
        if(document.querySelector('#email')) {
          validation.addField('#email', [
            {
              rule: 'required',
              errorMessage: 'Обязательное поле',
            },
            {
              rule: 'email',
              errorMessage: 'Недопустимый формат',
            },
          ])
        }
        validation.addField('#appl-check', [
          {
            rule: 'required',
            // errorMessage: 'Обязательное поле',
          },
        ])
        .addRequiredGroup(
          '#appl-check-group',
          'Обязательное поле'
        )
        .onSuccess((event) => {
          // let form = document.querySelector('#form');
          // form.action = 'https://google.com/search';
          // form.method = 'GET';
          // form.submit();



          let form = document.querySelector(formIdTest);

          let formData = new FormData(form);
          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log('Отправлено');
                validatorOpenSuccessModal();
              }
            }
          }

          xhr.open('POST', 'mail.php', true);
          xhr.send(formData);

          form.reset();


        });


    document.querySelectorAll('.appl-form__input').forEach((element) => {
      element.addEventListener('input', () => {
        if (element.classList.contains('is-invalid') || element.classList.contains('just-validate-success-field')) {
          element.classList.remove('focus-visible');
        }
      })
    });


    function validatorOpenSuccessModal() {

      var overlayWindow = document.createElement('div')
      overlayWindow.className = "overlay";

      var picModal = document.createElement('div');
      picModal.className = "modal";

      var modalCloseBtnTest = document.createElement('button');
      modalCloseBtnTest.className = "modal__close-btn reset";
      var modalCloseBtnXTest = document.createElement('span');
      modalCloseBtnXTest.className = "modal__close-btn-x";

      if(overlayWindow) {
        wrap(modalReqIsSend, picModal);
        wrap(picModal, overlayWindow);


        picModal.append(modalCloseBtnTest);
        modalCloseBtnTest.append(modalCloseBtnXTest);
        document.querySelector('body').style.overflow = 'hidden';
        modalReqIsSend.classList.remove('modal-inactive');
        setTimeout(() => {
          overlayWindow.classList.add('active');
        }, 1)
      }


      overlayWindow.addEventListener('click', (overlayClose) => {
        if(overlayClose.target == overlayWindow) {{
            closeOverlay(overlayWindow, picModal, modalCloseBtnTest);
          }
        }
      })

      modalCloseBtnTest.addEventListener('click', () => {
        closeOverlay(overlayWindow, picModal, modalCloseBtnTest);
      })

      function wrap(el, wrapper) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      }

      function closeOverlay(overlay, modal, btnClose) {
        btnClose.remove();
        overlay.classList.remove('active');
        setTimeout(() => {
          document.querySelector('body').style.overflow = 'auto';
          modalReqIsSend.classList.add('modal-inactive');

          var docFrag = document.createDocumentFragment();
          while (overlay.firstChild) {
            var child = overlay.removeChild(overlay.firstChild);
            docFrag.appendChild(child);
          }
          overlay.parentNode.replaceChild(docFrag, overlay);

          while (modal.firstChild) {
            var child = modal.removeChild(modal.firstChild);
            docFrag.appendChild(child);
          }
          modal.parentNode.replaceChild(docFrag, modal);

        }, 300)
      }
    };

    // document.querySelector('.appl-form__check-label .just-validate-error-label').classList.add('')
  }
})
