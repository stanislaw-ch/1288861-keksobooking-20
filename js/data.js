'use strict';

// data.js — модуль, который создаёт данные;
(function () {
  /**
   * Возвращает сгенерированный объект
   * @param {number} OBJECT
   *
   * @return {object} array
   */
  window.data = {
    getMapPinObject: function (OBJECT) {
      var mapPin = {
        author: {
          avatar: OBJECT
        },
        offer: {
          title: OBJECT,
          price: OBJECT,
          type: OBJECT,
          rooms: OBJECT,
          guests: OBJECT,
          checkin: OBJECT,
          checkout: OBJECT,
          features: OBJECT,
          description: OBJECT,
          photos: OBJECT
        },
        location: {
          x: OBJECT,
          y: OBJECT
        }
      };
      mapPin.offer.address = mapPin.location.x + ', ' + mapPin.location.y;
      return mapPin;
    }
  };
})();
