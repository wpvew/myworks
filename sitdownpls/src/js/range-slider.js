document.addEventListener('DOMContentLoaded', () => {

  const rangeSlider = document.querySelector('#range-slider');

  if(rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [2000, 150000],
      connect: true,
      step: 1000,
      range: {
          'min': 0,
          'max': 250000
      }
  });


  const inputForm = document.querySelector('#range-input-from');
  const inputTo = document.querySelector('#range-input-to');

  const inputs = [inputForm, inputTo]

  rangeSlider.noUiSlider.on('update', function(values, handle){
    inputs[handle].value = Math.round(values[handle]);
  })

  const setRangeSlider = (i, value) => {
    let arr = [null, null];
    arr[i] = value;

    rangeSlider.noUiSlider.set(arr);
  }

  inputs.forEach((el, index) => {
    el.addEventListener('change', (e) => {
      setRangeSlider(index, e.currentTarget.value);
    })
  })

  }




  function focusControler() {

    document.querySelectorAll('.noUi-handle').forEach((elementNoUi) => {

      if(elementNoUi.classList.contains('focus-visible') || document.querySelector('.noUi-handle').classList.contains('focus-visible')) {
        document.querySelector('.noUi-connect').classList.add('focus');
      } else {
        document.querySelector('.noUi-connect').classList.remove('focus');
      }
    })
  }

  document.addEventListener('keydown', function(event) {
    if (event.code == 'Tab') {
      window.requestAnimationFrame(focusControler);
    }
  });

  document.querySelectorAll('.noUi-handle').forEach((elementNoUi) => {
    elementNoUi.addEventListener('mousedown', () => {
      document.querySelector('.noUi-connect').classList.add('focus');
    })
    elementNoUi.addEventListener('mouseup', () => {
      document.querySelector('.noUi-connect').classList.remove('focus');
    })
  })

})
