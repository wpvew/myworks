
document.addEventListener("DOMContentLoaded", () => {

  let similarSlider = new Swiper(".slides-container.similar-prod", {
    slidesPerView: 4,
    slidesPerGroup: 1,
    spaceBetween: 32,
    speed: 500,

    grid: {
      rows: 1,
      fill: "row"
    },

    // spaceBetween: 32,

    navigation: {
      nextEl: '.cardpage-section-similar-prod__btn-next',
      prevEl: '.cardpage-section-similar-prod__btn-prev',
    },

    breakpoints: {
      1: {
        slidesPerView: 2,
        spaceBetween: 16,
      },

      421: {
        slidesPerView: 2,
        spaceBetween: 32,
      },

      769: {
        slidesPerView: 3,
      },

      1180: {
        slidesPerView: 4,
      },
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
            slide.querySelector('.highrate-card__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.highrate-card__btn').tabIndex = '';
            // slide.tabIndex = "";
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.highrate-card__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.highrate-card__btn').tabIndex = '';
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


