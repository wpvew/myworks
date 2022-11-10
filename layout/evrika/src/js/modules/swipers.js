const partnerOptions = {
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    960: {
      slidesPerView: 4,
    }
  },
}

const feedbackOptions = {
  spaceBetween: 20,
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

const certificatesOptions = {
  slidesPerView: 4,

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    440: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    960: {
      slidesPerView: 4,
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
}

export { partnerOptions, feedbackOptions, certificatesOptions }
