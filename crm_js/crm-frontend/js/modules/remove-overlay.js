export function removeOverlay(overlayElement) {
  location.hash = '';
  overlayElement.classList.remove('animation');
  document.querySelector('body').removeAttribute('style');

  setTimeout(() => {
    overlayElement.remove();
  }, 300)
}
