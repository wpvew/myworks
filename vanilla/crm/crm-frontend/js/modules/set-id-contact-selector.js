export function setIdContactSelector() {
  const contactItems = document.querySelectorAll('.contact');
  const contactSelectors = document.querySelectorAll('.contact__select');
  const contactInputs = document.querySelectorAll('.contact__input');

  for (let i = 1; i <= contactItems.length; i++) {
    contactSelectors[i - 1].setAttribute('id', `selector-contact${i}`);
    contactInputs[i - 1].setAttribute('data-contact-input', `num_${i}`);
    const elementSelect = document.querySelector(`#selector-contact${i}`);

    const choices = new Choices(elementSelect, {
      searchEnabled: false,
      itemSelectText: '',
      resetScrollPosition: false,
      duplicateItemsAllowed: false,
    });
  }
}
