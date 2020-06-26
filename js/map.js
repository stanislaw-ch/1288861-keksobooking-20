'use strict';

/*
map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку,
отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
*/
(function () {
  var MAX_PIN_COUNT = 5;

  var similarMapPin = document.querySelector('.map__pins');
  var similarCard = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');

  window.map = {
    /**
     * Отрисовывает метки на карте
     * @param {array} pinsData
     */
    renderPinsMarkup: function (pinsData) {
      var takeNumber = pinsData.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : pinsData.length;
      var Fragment = document.createDocumentFragment();
      for (var j = 0; j < takeNumber; j++) {
        Fragment.appendChild(window.pin.renderMapPin(pinsData[j]));
      }
      similarMapPin.appendChild(Fragment);
    },

    /**
     * Отрисовывает карточку объявления после активации страницы
     * @param {array} cardData
     */
    renderCardList: function (cardData) {
      var Fragment = document.createDocumentFragment();
      Fragment.appendChild(window.card.renderCard(cardData[0]));
      similarCard.insertBefore(Fragment, filtersContainer);
    }
  };
})();
