'use strict';
(function () {

  var MAIN_MAP_PIN_X = 32;
  var MAIN_MAP_PIN_Y = 87;

  var similarMapPin = document.querySelector('.map__pins');
  var mainMapPin = similarMapPin.querySelector('.map__pin--main');

  var filterAd = document.querySelector('.ad-form');
  var filterAdress = filterAd.querySelector('#address');

  // var getPinPosition = function () {

  // };

  mainMapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mainMapPin.offsetTop - shift.y) >= (130 - MAIN_MAP_PIN_Y) && (mainMapPin.offsetTop - shift.y + MAIN_MAP_PIN_Y) <= 630) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      }

      if ((mainMapPin.offsetLeft - shift.x) >= (0 - MAIN_MAP_PIN_X) && (mainMapPin.offsetLeft - shift.x) <= (1200 - MAIN_MAP_PIN_X)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      }

      var mainMapPinPositionX = (mainMapPin.offsetLeft - shift.x) + MAIN_MAP_PIN_X;
      var mainMapPinPositionY = (mainMapPin.offsetTop - shift.y) + MAIN_MAP_PIN_Y;

      // Отображает в поле с адрессом координаты главного пина после загрузки страницы
      filterAdress.value = mainMapPinPositionX + ', ' + mainMapPinPositionY;

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
