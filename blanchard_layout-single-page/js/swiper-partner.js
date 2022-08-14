
document.addEventListener("DOMContentLoaded", () => {

  let gallerySlider = new Swiper(".slides-container.partners", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: "section-projects",
      type: "bullets"
    },
    navigation: {
      nextEl: ".section-projects__btn-next",
      prevEl: ".section-projects__btn-prev"
    },

    breakpoints: {

      1: {
        speed: 500,
        slidesPerGroup: 1,
        slidesPerView: 1,
        // spaceBetween: 34
      },

      668: {
        speed: 500,
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 35
      },

      769: {
        speed: 500,
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 50
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
            slide.ariaHidden = "false";
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
});
