const elementSelect = document.querySelector('#selector-fuel');
const choices = new Choices(elementSelect, {
  searchEnabled: false,
  itemSelectText: '',
  resetScrollPosition: false,
  duplicateItemsAllowed: false,
});

document.querySelector('.choices').addEventListener('click', () => {
  document.querySelectorAll('.choices__item').forEach((element) => {
    if(element.classList.contains('is-selected')){
      document.querySelector('.is-selected').remove();
    }
  })
})

document.addEventListener('keydown', function(event) {
  if (event.code == 'Enter' || event.code == 'Space') {
    document.querySelectorAll('.choices__item').forEach((element) => {
      if(element.classList.contains('is-selected')){
        document.querySelector('.is-selected').remove();
      }
    })
  }
});

export default choices;
