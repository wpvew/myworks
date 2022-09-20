document.addEventListener('DOMContentLoaded', () => {
  if(document.querySelector('.yamap')) {

    ymaps.ready(init);
    function init() {
      var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [55.754630, 37.625821],

        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 14
      },
      {
        zoomControlPosition: {top:"200px", right:"20px"},
        zoomControlSize: "small",
        geolocationControlPosition: {top:"270px", right:"20px"},
      })

      var myPlacemark = new ymaps.Placemark([55.750616, 37.641809], {
        balloonContent: `
        <div class="balloon">
          <h3 class="balloon__title">SitDownPls на Солянке</h3>
          <address class="balloon__address">м. Китай-город, ул. Солянка, д.24</address>
          <a class="balloon__phone-link reset" href="tel:+74958854547">
            <svg>
              <use xlink:href="#phone"></use>
            </svg>
            +7 (495) 885-45-47
          </a>
          <p class="balloon__work-time">
            <span class="balloon__work-time-heading">Часы работы</span>
            <span>: с 10:00 до 21:00</span>
          </p>
          <p class="balloon__info">
            <span class="balloon__info-heading">Что здесь</span>
            <span>: шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</span>
          </p>
        </div>
      `
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/mapmark-sdp.svg',
        // iconImageHref: 'https://cdn-icons-png.flaticon.com/512/484/484167.png',
        iconImageSize: [28, 28],
        hideIconOnBalloonOpen: false,
        balloonOffset: [5, -35]
      });


      // Размещение геообъекта на карте.
      myMap.geoObjects.add(myPlacemark);
      myMap.controls.remove('searchControl');
      myMap.controls.remove('routeButtonControl');
      myMap.controls.remove('trafficControl');
      myMap.controls.remove('typeSelector');
      myMap.controls.remove('fullscreenControl');
      myMap.controls.remove('rulerControl');
      myMap.behaviors.disable('scrollZoom');


      myPlacemark.balloon.open();
    }
  }
})
