
document.addEventListener("DOMContentLoaded", () => {

  if(document.querySelector('.slides-container.hero-bg')) {
    let gallerySlider = new Swiper(".slides-container.hero-bg", {
      slidesPerView: 1,
      // loop: true,

      autoplay: {
        delay: 5000,
      },

      grid: {
        rows: 1,
        fill: "row"
      },

      pagination: {
        el: ".section-hero .section-hero__pagination",
        type: "bullets",
        clickable: true
      },

      breakpoints: {
        1: {
          speed: 500,
          slidesPerGroup: 1,
          slidesPerView: 1,
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
            if (!slide.classList.contains("slide-visible")) {
              slide.querySelector('.hero-bg__btn').tabIndex = '-1';
              slide.tabIndex = "-1";
            } else {
              slide.querySelector('.hero-bg__btn').tabIndex = '';
              slide.tabIndex = "";
            }
          });
        },
        slideChange: function () {
          this.slides.forEach((slide) => {
            if (!slide.classList.contains("slide-visible")) {
              slide.querySelector('.hero-bg__btn').tabIndex = '-1';
              slide.tabIndex = "-1";
            } else {
              slide.querySelector('.hero-bg__btn').tabIndex = '';
              slide.tabIndex = "";
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
  }
});
