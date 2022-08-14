
document.addEventListener("DOMContentLoaded", () => {

  let gallerySlider = new Swiper(".slides-container.special", {
    // slidesPerView: 3,
    // slidesPerGroup: 3,
    speed: 800,

    grid: {
      rows: 1,
      fill: "row"
    },


    spaceBetween: 32,

    navigation: {
      nextEl: '.section-special__btn-next',
      prevEl: '.section-special__btn-prev',
    },

    breakpoints: {
      1: {
        slidesPerView: 1,
        slidesPerGroup: 1,
      },
      601: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      961: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1360: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
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
            slide.querySelector('.card-item__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.card-item__btn').tabIndex = '';
            slide.ariaHidden = "false";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          slide.tabIndex = "-1";
          if (!slide.classList.contains("slide-visible")) {
            slide.querySelector('.card-item__btn').tabIndex = '-1';
            slide.ariaHidden = "true";
          } else {
            slide.querySelector('.card-item__btn').tabIndex = '';
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

  function resizeItem () {

    var cardItem = document.querySelectorAll('.card-item');
    for(var i = 0; i < cardItem.length; i++) {
      if(cardItem[i].querySelector('.card-item__add-img')){
        if (cardItem[i].offsetWidth < 623) {
          document.querySelectorAll('.card-item__add-img').forEach((element) => {
            element.classList.add('inactive');
          })
        }else {
          document.querySelectorAll('.card-item__add-img').forEach((element) => {
            element.classList.remove('inactive');
          })
        }
      }
    }
  }

  window.addEventListener('resize',function(){
    resizeItem();
  });

  resizeItem();


});


