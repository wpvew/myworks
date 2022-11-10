const calcPhone = document.getElementById("calc-input-phone");
const deliveryPhone = document.getElementById("delivery-input-phone");
const requestPhone = document.getElementById("request-form-phone");

const phoneMask = new Inputmask("+7(999)999-99-99");

phoneMask.mask(calcPhone);
phoneMask.mask(deliveryPhone);
phoneMask.mask(requestPhone);

export {phoneMask}
