
document.addEventListener("DOMContentLoaded", () => {

  let miniImgSlider = new Swiper(".slides-container.mini-img-slides-modal", {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 78,
    speed: 500,

    grid: {
      rows: 1,
      fill: "row"
    },

    navigation: {
      nextEl: '.modal-img__btn-next',
      prevEl: '.modal-img__btn-prev',
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
  })
});


