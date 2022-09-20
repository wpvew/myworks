
document.addEventListener("DOMContentLoaded", () => {

  let usefulSlider = new Swiper(".slides-container.useful", {
    // slidesPerView: 1,
    // slidesPerGroup: 1,
    speed: 500,

    grid: {
      rows: 1,
      fill: "row"
    },

    spaceBetween: 32,

    navigation: {
      nextEl: '.section-useful__btn-next',
      prevEl: '.section-useful__btn-prev',
    },

    breakpoints: {

      1: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },

      533: {
        slidesPerView: 2,
        slidesPerGroup: 1,
      },

      852: {
        slidesPerView: 3,
        slidesPerGroup: 1,
      },

      1025: {
        slidesPerView: 2,
        slidesPerGroup: 1,
      },
    //   961: {
    //     slidesPerView: 3,
    //     slidesPerGroup: 3,
    //   },
    //   1360: {
    //     slidesPerView: 'auto',
    //     slidesPerGroup: 3,
    //   },
    },

    simulateTouch: false,

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
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.useful-card__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.useful-card__btn').tabIndex = '';
            // slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.useful-card__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.useful-card__btn').tabIndex = '';
            // slide.tabIndex = "";
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
  })
});


