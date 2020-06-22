'use strict';

/*
map.js — модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку,
отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;
*/
(function () {

  var TOTAL_PINS = 8;

  var similarMapPin = document.querySelector('.map__pins');
  var similarCard = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');


  // var getMapPins = window.backend.load(window.data.array);


  window.map = {
    /**
     * Возвращает массив из объектов
     * @param {number} number
     *
     * @return {array} array
     */
    // getMapPins: function (data) {
    //   var array = [];
    //   for (var i = 0; i < 8; i++) {
    //     array[i] = window.backend.load(data);
    //   }
    //   return array;
    // },

    // getMapPins: function (array) {
    //   return array;
    // },

    // getMapPins: getMapPins,

    /**
     * Отрисовывает метки на карте
     * @param {array} pinsData
     */
    renderPinsMarkup: function (pinsData) {
      var Fragment = document.createDocumentFragment();
      for (var j = 0; j < pinsData.length; j++) {
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