/* eslint-disable no-undef */
import { setChildren } from 'redom';

export async function pageModule(header) {
  history.pushState('?page=banks', null, '/profile?page=banks');

  header.btnBanks.setAttribute('disabled', true);

  const renderPageBanks = (await import('./render-pages.js')).pageBanks();
  setChildren(document.body, [header.header, renderPageBanks]);

  const res = await fetch('http://localhost:3000/banks').then((data) =>
    data.json()
  );

  ymaps.ready(init);
  function init() {
    const myMap = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 11,
    });

    myMap.behaviors.disable('scrollZoom');

    for (let coord of res.payload) {
      myMap.geoObjects.add(setPlacemark(coord));
    }
  }
}

function setPlacemark({ lat, lon }) {
  return new ymaps.Placemark([lat, lon], {
    preset: 'islands#icon',
    iconColor: '#0095b6',
  });
}
