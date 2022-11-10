const rangeSlider = document.getElementById('slider');
noUiSlider.create(rangeSlider, {
  start: 1670,
  step: 10,
  behaviour: 'snap',
  connect: [true, false],
  range: {
      'min': 100,
      'max': 5000
  }
});


const rangeSliderInput = document.getElementById('range-slider-input');
const priceFuel = document.getElementById('price-fuel').innerHTML;
const valueFuel = document.getElementById('value-fuel');
const profit = document.getElementById('value-profit');

rangeSlider.noUiSlider.on('update', function (values, handle) {
  rangeSliderInput.value = parseInt(values[handle])
  valueFuel.innerHTML = +rangeSliderInput.value * +priceFuel;
  profit.innerHTML =  (49.59 * +rangeSliderInput.value - +rangeSliderInput.value * +priceFuel).toFixed(2);
});

export default rangeSlider;
