document.addEventListener("DOMContentLoaded", () => {

// const MOBILE_WIDTH = 580;

function getWindowWidth () {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}
// console.log(getWindowWidth());

// yandex map
ymaps.ready(init);
function init() {
  if(getWindowWidth() > 668) {
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.758468, 37.601088],

      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    },
    {
      zoomControlPosition: {top:"310px", right:"20px"},
      zoomControlSize: "small",
      geolocationControlPosition: {top:"390px", right:"20px"},
    })
  } else if (getWindowWidth() <= 668 && getWindowWidth() > 416) {
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.758468, 37.601088],

      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    },
    {
      zoomControlPosition: {top:"170px", right:"15px"},
      zoomControlSize: "small",
      geolocationControlPosition: {top:"260px", right:"15px"},
    })
  } else {
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.758468, 37.601088],

      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 15
    },
    {
      zoomControlPosition: {top:"110px", right:"10px"},
      zoomControlSize: "small",
      geolocationControlPosition: {top:"200px", right:"10px"},
    })
  }
  // Создание карты.

  var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-mark.svg',
    iconImageSize: [20, 20],
  });



  // Размещение геообъекта на карте.
  myMap.geoObjects.add(myPlacemark);
  myMap.controls.remove('searchControl');
  myMap.controls.remove('routeButtonControl');
  myMap.controls.remove('trafficControl');
  myMap.controls.remove('typeSelector');
  myMap.controls.remove('fullscreenControl');
  myMap.controls.remove('rulerControl');
  myMap.behaviors.disable('scrollZoom');
}


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


// gallery slider

// document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container.art-pictures", {
    slidesPerView: 1,

    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".section-gallery .section-gallery__pagination",
      type: "fraction"
    },
    navigation: {
      nextEl: ".section-gallery__btn-next",
      prevEl: ".section-gallery__btn-prev"
    },

    breakpoints: {

      321: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 20
      },

      669: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 37
      },

      1025: {
        speed: 1000,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50
      },
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.tabIndex = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
            slide.ariaHidden = "true";
          } else {
            slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      }
    }


    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });
// });




// accordion

$(".accordion").accordion({
  heightStyle: "content",
  collapsible: true,
  icons: false,
  // active: false,
});

document.querySelectorAll('.section-catalog__year-btn').forEach(function(accTabInx) {
  accTabInx.tabIndex = '0'
  accTabInx.addEventListener('click', function() {
    accTabInx.tabIndex = '0'
  })
  accTabInx.addEventListener('keydown', function(accTabInxKey) {
    if (accTabInxKey.code == 'Enter') {
    accTabInx.tabIndex = '0'
    }
  })
})


let faqCheck = 1;
let faq;

document.querySelectorAll('.section-catalog__year-btn').forEach(function (eventMyIcon) {
  eventMyIcon.addEventListener('keydown', function (eventMyIconTarget) {
    if (eventMyIconTarget.code == 'Enter' || eventMyIconTarget.code == 'Space') {
      const faq = eventMyIconTarget.currentTarget.dataset.path

      if (faqCheck == faq) {
        document.querySelector(`[data-target="${faq}"]`).classList.remove('myicon-active')
        faqCheck = 0;
        // console.log('if1')
      } else if (faqCheck == 1) {
        document.querySelectorAll('.accoridon-myicon').forEach(function (myIcon) {
          myIcon.classList.remove('myicon-active')
        })
        // console.log('if2')
        faqCheck = 0;
        if (faq != "acc-one") {
          document.querySelector(`[data-target="${faq}"]`).classList.toggle('myicon-active')
          // console.log('if2-1')
          faqCheck = faq;
        }
      } else {
        document.querySelectorAll('.accoridon-myicon').forEach(function (myIcon) {
          myIcon.classList.remove('myicon-active')
        })
        document.querySelector(`[data-target="${faq}"]`).classList.toggle('myicon-active')
        faqCheck = faq;
        // console.log('if3')
      }
    }
  })

  eventMyIcon.addEventListener('click', function (eventMyIconTarget) {
     faq = eventMyIconTarget.currentTarget.dataset.path;

     if (faqCheck == faq) {
      document.querySelector(`[data-target="${faq}"]`).classList.remove('myicon-active')
      faqCheck = 0;
      // console.log('if1')
    } else if (faqCheck == 1) {
      document.querySelectorAll('.accoridon-myicon').forEach(function (myIcon) {
        myIcon.classList.remove('myicon-active')
      })
      // console.log('if2')
      faqCheck = 0;
      if (faq != "acc-one") {
        document.querySelector(`[data-target="${faq}"]`).classList.toggle('myicon-active')
        // console.log('if2-1')
        faqCheck = faq;
      }
    } else {
      document.querySelectorAll('.accoridon-myicon').forEach(function (myIcon) {
        myIcon.classList.remove('myicon-active')
      })
      document.querySelector(`[data-target="${faq}"]`).classList.toggle('myicon-active')
      faqCheck = faq;
      // console.log('if3')
    }

   })
})


// gallery selector

const elementSelect = document.querySelector('#selector');
const choices = new Choices(elementSelect, {
  searchEnabled: false,
  itemSelectText: '',
  resetScrollPosition: false
});


// tabs

const MOBILE_WIDTH = 768;

// function getWindowWidth () {
//   return Math.max(
//     document.body.scrollWidth,
//     document.documentElement.scrollWidth,
//     document.body.offsetWidth,
//     document.documentElement.offsetWidth,
//     document.body.clientWidth,
//     document.documentElement.clientWidth
//   );
// }

document.querySelectorAll('.section-catalog__artist-link').forEach(function (tabsBtn) {
  tabsBtn.addEventListener('click', function (eventTab) {
     const path = eventTab.currentTarget.dataset.path

    document.querySelectorAll('.section-catalog__artist-link').forEach(function (rmActiveTab) {
      rmActiveTab.classList.remove('section-catalog__artist-link--active')
    })

    eventTab.target.classList.add('section-catalog__artist-link--active')


    if(getWindowWidth() > MOBILE_WIDTH) {
      document.querySelector('.artist-info--active').classList.add('artist-info--hide')
      setTimeout(function(){
        document.querySelectorAll('.artist-info').forEach(function (tabsContent) {
          tabsContent.classList.remove('artist-info--hide')
          tabsContent.classList.remove('artist-info--active')
        })
      },400)

      setTimeout(function(){
        document.querySelector(`[data-target="${path}"]`).classList.toggle('artist-info--active')
      },400)
    } else {
        document.querySelectorAll('.artist-info').forEach(function (tabsContent) {
          tabsContent.classList.remove('artist-info--active')
        })
        document.querySelector(`[data-target="${path}"]`).classList.toggle('artist-info--active')
    }
  })
})


function scrollToContent (link, isMobile) {
	if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
		return;
  }

  const href = link.getAttribute('data-scroll').substring(0);
  const scrollTarget = document.querySelector(`[data-target="${href}"]`).offsetTop;
  const currentPosition = window.pageYOffset;
  const distance = scrollTarget - currentPosition ;
  const duration = 1000;
  let start = null;

  requestAnimationFrame(step);

  function step(timestamp) {
    // console.log("start = " + timestamp);
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(0, easeInOutCubic(progress, currentPosition, distance, duration));
    if (progress < duration) window.requestAnimationFrame(step);
  }


  function easeInOutCubic(t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
  }
}

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();
      scrollToContent(this, true);
  });
});



// tooltip

tippy('.js-tooltip-btn', {
  allowHTML: true,
  maxWidth: 264,
  placement: 'top',
  arrow: true,
  // trigger: 'click',
});


// validator

var selector = document.querySelector("input[type='tel']");

var im = new Inputmask("+7(999)-999-99-99");
im.mask(selector);

document.querySelector('#form-contact-btn').addEventListener('click', function(){

  new JustValidate('.section-contact__form', {
    '#form-contact': {
      focusInvalidField: true,
      lockForm: true,
    },

    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
      },

      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        }
      },
    },

    messages: {
      // name: "Как Вас зовут?",
      // tel: "Укажите Ваш телефон",
    },

    submitHandler: function(thisForm) {
      let formData = new FormData(thisForm);

      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Отправлено');
            document.querySelector('.message-send').classList.add('message-send--transform')
            setTimeout(()=>{
              document.querySelector('.message-send').classList.remove('message-send--transform')
            },2000)
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      thisForm.reset();
    },



  });
})


// open search form

// bottom
document.querySelector('#btn-open-search-bottom').addEventListener('click', function () {
  document.querySelector('.art-menu').classList.add('art-menu--inactive')
  document.querySelector('#btn-open-search-bottom').classList.add('header-blanchard__open-search--inactive')
  document.querySelector('#form-search-bottom').classList.add('form-search--active')
  document.querySelector('.header-blanchard__container').classList.add('header-blanchard__container--search-active')
  document.querySelector('.header-blanchard__search-block-bottom').classList.add('header-blanchard__search-block-bottom--search-active')
  setTimeout(function(){
    document.querySelector('#form-search-bottom').classList.add('form-search--transform')
  },1)
})

document.querySelector('#btn-close-search-bottom').addEventListener('click', function () {
  document.querySelector('#form-search-bottom').classList.remove('form-search--transform')
  setTimeout(function(){
    document.querySelector('.art-menu').classList.remove('art-menu--inactive')
    document.querySelector('#btn-open-search-bottom').classList.remove('header-blanchard__open-search--inactive')
    document.querySelector('.header-blanchard__container').classList.remove('header-blanchard__container--search-active')
    document.querySelector('#form-search-bottom').classList.remove('form-search--active')
    document.querySelector('.header-blanchard__search-block-bottom').classList.remove('header-blanchard__search-block-bottom--search-active')
    document.querySelector('#form-search-input-bottom').value = ""
  },300)
})

// top
document.querySelector('#btn-open-search-top').addEventListener('click', function () {
  document.querySelector('#btn-open-search-top').classList.add('header-blanchard__open-search--inactive')
  document.querySelector('#form-search-top').classList.add('form-search--active')
  document.querySelector('.header-blanchard__search-block-top').classList.add('header-blanchard__search-block-top--active')
  document.querySelector('.burger').classList.add('margin-burger--search-active')
  document.querySelector('.logo').classList.add('logo--inactive')
  document.querySelector('.burger').classList.add('burger--inactive')
  setTimeout(function(){
    document.querySelector('#form-search-top').classList.add('form-search--transform')
  },1)
})

document.querySelector('#btn-close-search-top').addEventListener('click', function () {
  document.querySelector('#form-search-top').classList.remove('form-search--transform')
  setTimeout(function(){
    document.querySelector('.burger').classList.remove('margin-burger--search-active')
    document.querySelector('.burger').classList.remove('burger--inactive')
    document.querySelector('.logo').classList.remove('logo--inactive')
    document.querySelector('.header-blanchard__search-block-top').classList.remove('header-blanchard__search-block-top--active')
    document.querySelector('#form-search-top').classList.remove('form-search--active')
    document.querySelector('#btn-open-search-top').classList.remove('header-blanchard__open-search--inactive')
    document.querySelector('#form-search-input-top').value = ""
  },300)
})



// navbar mobile

document.querySelector('.burger').addEventListener('click', function () {
  document.querySelector('.navbar-mini').classList.add('navbar-mini--active')
  document.querySelector('.navbar-mini').classList.add('navbar-mini--mobile-active')
  setTimeout(function(){
    document.querySelector('.navbar-mini').classList.add('navbar-mini--transform')
    document.querySelector('body').classList.add('navbar-mini--mobile-active-body')
  },1)
})


document.querySelector('.navbar-mini__btn-close').addEventListener('click', function () {
  document.querySelector('.navbar-mini').classList.remove('navbar-mini--transform')
  document.querySelector('body').classList.remove('navbar-mini--mobile-active-body')
  document.querySelector('.navbar-mini').classList.remove('navbar-mini--mobile-active')
  setTimeout(function() {
    document.querySelector('.navbar-mini').classList.add('navbar-mini--active')
  },300)
})

document.querySelector('.navbar-mini__link:first-child').addEventListener('click', function() {
  document.querySelector('body').classList.remove('navbar-mini--mobile-active-body')
  document.querySelector('.navbar-mini').classList.remove('navbar-mini--mobile-active')
  setTimeout(function() {
    document.querySelector('.navbar-mini').classList.remove('navbar-mini--transform')
  },1)
})

document.querySelectorAll('.navbar-mini__link').forEach(function(closeNavMini){
  closeNavMini.addEventListener('click', function() {
    document.querySelector('body').classList.remove('navbar-mini--mobile-active-body')
    document.querySelector('.navbar-mini').classList.remove('navbar-mini--mobile-active')
    setTimeout(function() {
      document.querySelector('.navbar-mini').classList.remove('navbar-mini--transform')
    },300)
  })
})



document.querySelector('.section-gallery__swiper .section-gallery__navigator .section-gallery__pagination').ariaHidden = 'true'




// modal
const modalOverlay = document.querySelector('.picture-modal-overlay');
const modalBtnClose = document.querySelectorAll('.picture-modal__close-btn');
const modalPicture = document.querySelectorAll('.picture-modal');

document.querySelectorAll('.art-pictures__slide').forEach((modalElement) => {
  modalElement.addEventListener('click', (modalE) => {
    const modalPath = modalE.currentTarget.dataset.path
    modalOverlay.classList.add('picture-modal-overlay--active')
    document.querySelector('body').classList.add('picture-modal-body--active')
    setTimeout(() => {
      document.querySelector(`[data-target="${modalPath}"]`).classList.add('picture-modal--visible')
    },1)
    document.querySelector(`[data-target="${modalPath}"]`).classList.add('picture-modal--active')
  })
})

modalBtnClose.forEach((modalBtnCloseElement) => {
  modalBtnCloseElement.addEventListener('click', () => {
    modalOverlay.classList.remove('picture-modal-overlay--active')
    document.querySelector('body').classList.remove('picture-modal-body--active')
    modalPicture.forEach((modalPictureElement) => {
      setTimeout(() => {
        modalPictureElement.classList.remove('picture-modal--active')
      },300)
      modalPictureElement.classList.remove('picture-modal--visible')
    })
  })
})

modalOverlay.addEventListener('click', (modalClose) => {
  if (modalClose.target == modalOverlay) {
    modalOverlay.classList.remove('picture-modal-overlay--active')
    document.querySelector('body').classList.remove('picture-modal-body--active')
    modalPicture.forEach((modalPictureElement) => {
      setTimeout(() => {
        modalPictureElement.classList.remove('picture-modal--active')
      },300)
      modalPictureElement.classList.remove('picture-modal--visible')
    })
  }
});

})
