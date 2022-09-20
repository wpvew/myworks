export function createContactIcon(iconItem) {
  const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');

  iconItem = iconItem === 'add-tel' ? 'other-contact' : iconItem;

  svgElem.classList.add(`svg-${iconItem}`, 'svg-base-element')
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${iconItem}`);

  svgElem.appendChild(useElem);
  return { svgElem }
}
