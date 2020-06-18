'use strict';

// pin.js — модуль, который отвечает за создание метки на карте;
(function () {

  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.pin = {
    /**
     * Отрисовывает маркер
     * @param {array} mapPin
     *
     * @return {array} mapPinElement
     */
    renderMapPin: function (mapPin) {
      var mapPinElement = similarMapPinTemplate.cloneNode(true);

      mapPinElement.style.top = mapPin.location.y + 'px';
      mapPinElement.style.left = mapPin.location.x + 'px';
      mapPinElement.querySelector('img').alt = mapPin.offer.title;
      mapPinElement.querySelector('img').src = mapPin.author.avatar;

      mapPinElement.addEventListener('click', function () {
        var MapCardRemove = window.main.mapBlock.querySelector('.map__card');
        if (MapCardRemove) {
          MapCardRemove.remove();
        }
        window.card.renderCard(mapPin);
        document.addEventListener('keydown', window.main.onEscDown);
      });

      return mapPinElement;
    }
  };
})();
