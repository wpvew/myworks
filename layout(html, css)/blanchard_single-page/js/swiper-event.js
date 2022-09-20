document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".slides-container.events", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".section-events .section-events__pagination",
      type: "bullets"
    },
    navigation: {
      nextEl: ".section-events__btn-next",
      prevEl: ".section-events__btn-prev"
    },

    breakpoints: {
      1: {
        slidesPerGroup: 1,
        slidesPerView: 1,
        // spaceBetween: 34
        pagination: { clickable: true }

      },

      668: {
        speed: 500,
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34
      },

      960: {
        speed: 1000,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 27
      },

      1481: {
        speed: 1000,
        slidesPerGroup: 3,
        slidesPerView: 3,
        spaceBetween: 50
      }
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
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.section-events__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            // slide.tabIndex = "";
            slide.querySelector('.section-events__btn').tabIndex = '';
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.section-events__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            // slide.tabIndex = "";
            slide.querySelector('.section-events__btn').tabIndex = '';
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
});

