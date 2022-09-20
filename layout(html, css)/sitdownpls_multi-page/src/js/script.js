// header selector
document.addEventListener('DOMContentLoaded', () => {

  const elementSelect = document.querySelector('#selector-city');
  const choices = new Choices(elementSelect, {
    searchEnabled: false,
    itemSelectText: '',
    resetScrollPosition: false,
    duplicateItemsAllowed: false,
  });


document.querySelector('.choices').addEventListener('click', () => {
  document.querySelectorAll('.choices__item').forEach((element) => {
    if(element.classList.contains('is-selected')){
      document.querySelector('.is-selected').remove();
    }
  })
})

document.addEventListener('keydown', function(event) {
  if (event.code == 'Enter' || event.code == 'Space') {
    document.querySelectorAll('.choices__item').forEach((element) => {
      if(element.classList.contains('is-selected')){
        document.querySelector('.is-selected').remove();
      }
    })
  }
});

// header simplebar

  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

      if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassName)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassName}`)) {
        const btn = evt.target.closest(`.${params.btnClassName}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  setMenuListener();


  // burger

  const burgerBtn = document.querySelector('.burger');
  burgerBtn.addEventListener('click', () => {
    document.querySelector('.burger__item').classList.toggle('burger-open');
    document.querySelector('.navbar-menu').classList.toggle('burger-open');
  })

  // инпут

  var input = document.querySelector('.search-form__input');
  input.addEventListener('input', () => {
    document.querySelector('.search-svg').classList.add('active');
    input.classList.remove('focus-visible');

    if(input.value == '') {
      document.querySelector('.search-svg').classList.remove('active')
    }
  })




// tooltip

tippy('.js-tooltip-btn', {
  allowHTML: true,
  maxWidth: 264,
  placement: 'top',
  arrow: true,
  // trigger: 'click',
});


// open-more-btn

if(document.querySelector('.open-more-btn')) {

  document.querySelectorAll('.js-header-dropdown-btn').forEach((btnSelect) => {
    btnSelect.addEventListener('click', (btnSelectClick) => {
      const pathSelect = btnSelectClick.currentTarget.dataset.path;

      var elementCheckbox = document.querySelectorAll(`.filter-mini-select [data-target="${pathSelect}"] .catalog-check`);
      const btnShowMore = document.querySelector(`.filter-mini-select [data-target="${pathSelect}"] .open-more-btn`);
      const result = document.querySelector(`.filter-mini-select [data-target="${pathSelect}"] .open-more-btn__result`);

      if(btnShowMore.classList.contains('visually-hidden')) {
        btnShowMore.classList.remove('visually-hidden');
      }


      for(var i = 1; i < elementCheckbox.length; i++) {
        if(i > 8) {
          elementCheckbox[i].classList.add('visually-hidden')
        }
      }

      const hiddenClass = document.querySelectorAll(`.filter-mini-select [data-target="${pathSelect}"] .catalog-check.visually-hidden`);

      if (hiddenClass.length != 0) {
        result.innerHTML = hiddenClass.length;
      } else {
        btnShowMore.classList.add('visually-hidden');
      }

      console.log(btnShowMore);
      console.log(hiddenClass);

      btnShowMore.addEventListener('click', () => {
          hiddenClass.forEach((elem) => {
              elem.classList.remove('visually-hidden');
          })
          btnShowMore.classList.add('visually-hidden');
      })
    })
  });

}


// tag

var myBlock = null;
var newElement = null;
var tagElement = null;
var chBox = document.querySelectorAll('.catalog-check__base-checkbox[type="checkbox"]');
const rdBtns = document.querySelectorAll('.catalog-check__base-checkbox[type="radio"]');
console.log(document.body.offsetWidth)

if(document.body.offsetWidth > 1024) {
  var priceInput = document.querySelector('.filter-price__input.price-input[name="to"]');
} else {
  var priceInput = document.querySelector('.filter-mini-select__price-input.price-input[name="to"]');
}


var attrName = null;
var attrBlock = null;
var attrValue = null;

if(priceInput) {
  function priceTag() {
    document.querySelectorAll('.tag-name.price-block').forEach((priceElement) => {
      priceElement.remove();
    })
    attrValue = priceInput.value;
    var newElement = document.createElement("div");
    var newElementCloseBtn = document.createElement("button");
    newElement.className = 'tag-name price-block';
    newElement.innerHTML = attrValue;
    myBlock = document.getElementById("tags");
    myBlock.append(newElement);
  }

  priceInput.addEventListener('change', () => {
    priceTag();
  })

  document.querySelector('.noUi-handle.noUi-handle-upper').addEventListener('click', () => {
    priceTag();
  })

  priceTag();
}


document.querySelectorAll('.catalog-check').forEach((labelElement) => {
  labelElement.addEventListener('click', () => {
    for(const rdBtn of rdBtns) {
      rdBtn.onclick = () => {

        document.querySelectorAll('.tag-name.sale-block').forEach((tagElement) => {
          tagElement.remove();
        })

        if(rdBtn.checked) {

          attrName = rdBtn.getAttribute('value');
          attrBlock = rdBtn.getAttribute('data-type-check');

          console.log(attrName);

          var newElement = document.createElement("div");
          var newElementCloseBtn = document.createElement("button");

          if(attrBlock == 'category') {
            newElement.className = 'tag-name category-block';
          } else if (attrBlock == 'color') {
            newElement.className = 'tag-name color-block';
          } else if (attrBlock == 'sale') {
            newElement.className = 'tag-name sale-block';
          } else {
            newElement.className = 'tag-name unknown-block';
          }

          newElement.innerHTML = attrName;
          myBlock = document.getElementById("tags");
          newElement.setAttribute('data-target', attrName);
          myBlock.append(newElement);

          tagElement = document.getElementsByClassName('tag-name')
          newElementCloseBtn.className = 'tag-name__btn reset';
          newElementCloseBtn.setAttribute('data-path', attrName);
          newElement.append(newElementCloseBtn);
        }
      }
    }
  })
})




document.querySelectorAll('.catalog-check').forEach((labelElement) => {
  labelElement.addEventListener('click', () => {
      chBox.forEach((elem) => {
          elem.onclick = () => {
            attrName = elem.getAttribute('value');
            attrBlock = elem.getAttribute('data-type-check');

            if(elem.checked) {
              var newElement = document.createElement("div");
              var newElementCloseBtn = document.createElement("button");

              if(attrBlock == 'category') {
                newElement.className = 'tag-name category-block';
              } else if (attrBlock == 'color') {
                newElement.className = 'tag-name color-block';
              } else if (attrBlock == 'sale') {
                newElement.className = 'tag-name sale-block';
              } else {
                newElement.className = 'tag-name unknown-block';
              }

              newElement.innerHTML = attrName;
              myBlock = document.getElementById("tags");
              newElement.setAttribute('data-target', attrName);
              myBlock.append(newElement);

              tagElement = document.getElementsByClassName('tag-name');
              newElementCloseBtn.className = 'tag-name__btn reset';
              newElementCloseBtn.setAttribute('data-path', attrName);
              newElement.append(newElementCloseBtn);

            }else {
              document.querySelectorAll('.tag-name').forEach((tagElement) => {
                if(tagElement.textContent == attrName) {
                  tagElement.remove();
                }
              })
            }
          }
      })
  })
})




  document.querySelectorAll('.catalog-check').forEach((labelElement) => {
    labelElement.addEventListener('click', () => {
      const tagBtnClose = document.querySelectorAll('.tag-name__btn');
      tagBtnClose.forEach((tagBtnCloseElement) => {
        tagBtnCloseElement.onclick = (tagBtnCloseElementClick) => {
          console.log(tagBtnCloseElementClick.currentTarget.dataset.path)
          const tagBtnCloseElementPath = tagBtnCloseElementClick.currentTarget.dataset.path;

          document.querySelector(`[data-target="${tagBtnCloseElementPath}"]`).remove();
          document.querySelectorAll(`[value="${tagBtnCloseElementPath}"]`).forEach((checkedElement) => {
            checkedElement.checked = false;
          })
        }
      })
    })
  })



  // current-page-menu

  const trackMenu = document.querySelectorAll('.navbar-current-page__link');

  for(var i = 0; i < trackMenu.length; i++) {
    if(i == trackMenu.length - 1) {
      trackMenu[i].classList.add('active')
    }
  }



  // cardpage modal

  const buyOneClickBtn = document.querySelector('.cardpage__buy-btn');
  const imageBtn = document.querySelector('.cardpage__main-img');
  const modalCallback = document.querySelector('.modal-callback');
  const modalImage = document.querySelector('.modal-img');


  document.addEventListener('click', (clickElement) => {
    if(clickElement.target == buyOneClickBtn){
      openModuleWindow(modalCallback);
    } else if (clickElement.target == imageBtn) {
      openModuleWindow(modalImage);
    }
  })


  function openModuleWindow(modalItem) {

    var overlayWindow = document.createElement('div')
    overlayWindow.className = "overlay";

    var picModal = document.createElement('div');
    picModal.className = "modal";

    var modalCloseBtnTest = document.createElement('button');
    modalCloseBtnTest.className = "modal__close-btn reset";
    var modalCloseBtnXTest = document.createElement('span');
    modalCloseBtnXTest.className = "modal__close-btn-x";

    wrap(modalItem, picModal);
    wrap(picModal, overlayWindow);


    picModal.append(modalCloseBtnTest);
    modalCloseBtnTest.append(modalCloseBtnXTest);


    if(overlayWindow) {
      document.querySelector('body').style.overflow = 'hidden';
      modalItem.classList.remove('modal-inactive');
      setTimeout(() => {
        overlayWindow.classList.add('active');
      }, 1)
    }

    overlayWindow.addEventListener('click', (overlayClose) => {
      if(overlayClose.target == overlayWindow) {
        closeOverlay(overlayWindow, picModal, modalCloseBtnTest);
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
        modalItem.classList.add('modal-inactive');

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
  }


  // lazyload
  lazyload();

})
