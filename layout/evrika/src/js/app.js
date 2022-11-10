import { partnerOptions, feedbackOptions, certificatesOptions } from './modules/swipers.js'
import setMenuListener from "./modules/dropdown.js";
import rangeSlider from './modules/rangeSlider.js';
import masks from './modules/inputmasks.js'
import choices from './modules/choices.js';
import { ApiServer } from './modules/ApiServer.js';

const menuBtn = document.querySelector('.burger-menu');
const navbarMenu = document.querySelector('.navbar-menu');

document.addEventListener('click', (event) => {
  if(!event.target.closest('.navbar-menu')) {
    navbarMenu.classList.remove('active');
    menuBtn.classList.remove('active');
  }
})

menuBtn.addEventListener('click', (event) => {
  event.stopPropagation()
  switchMobileMenu()
})

const switchMobileMenu = () => {
  navbarMenu.classList.toggle('active');
  menuBtn.classList.toggle('active');
}

[document.querySelector('.delivery-form'), document.querySelector('.form-calc'), document.querySelector('.request-form')].forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const serviceMsg = event.target.querySelector('.js-service-msg')
    const obj = {};
    event.target.querySelectorAll('input[name]').forEach(input => {
      obj[input.name] = input.value;
      obj['node'] = obj['node'] ? [...obj['node'], input] : [input]
    })
    const data = {...obj}
    delete data.node
    ApiServer.post(data).then((res) => {
      serviceMsg.innerHTML = 'Ваш запрос успешно отправлен'
    }).catch(() => {
      serviceMsg.innerHTML = 'Произошла ошибка, попробуйте снова'
    }).finally(() => {
      serviceMsg.classList.add('active')
      setTimeout(() => {
        serviceMsg.classList.remove('active')
      }, 3000)
      obj.node.forEach(input => {
        if(input.getAttribute('id') !== 'range-slider-input') input.value = ''
      })
    })
  })
})
setMenuListener();

new Swiper('#swiper-certificates', certificatesOptions);
new Swiper('#swiper-partners', partnerOptions)
new Swiper('#swiper-feedback', feedbackOptions);

new LazyLoad({});
