export function setOverlayPosition() {
  if (window.innerHeight <= document.querySelector('.modal').offsetHeight) {
    document.querySelector('.overlay').style.alignItems = 'flex-start';
  } else {
    document.querySelector('.overlay').style.alignItems = 'center';
  }
}
