
document.addEventListener("DOMContentLoaded", () => {

  var swiper = new Swiper(".swiper.catalog", {
    slidesPerView: 3,
    slidesPerGroup: 3,
    grid: {
      rows: 3,
    },
    spaceBetween: 32,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },

    breakpoints: {
      // 1: {
      //   slidesPerView: 1,
      //   slidesPerGroup: 1,
      //   grid: {
      //     rows: 3,
      //   },
      // },
      1: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 16,
        grid: {
          rows: 3,
        },
      },
      421: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 32,
        grid: {
          rows: 3,
        },
      },

      769: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
        },
      },
      1025: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          rows: 3,
        },
      },
      1310: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          rows: 3,
        },
      }
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
  });

  document.querySelectorAll('.section-catalog__swiper-pagination .swiper-pagination-bullet').forEach((paginationElement) => {
    paginationElement.setAttribute('aria-role', "button");
    paginationElement.tabIndex = '0';
  })

})


