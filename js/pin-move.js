'use strict';

(function () {

  var MAIN_MAP_PIN_HEIGHT = 86;
  var MAIN_MAP_PIN_WIDTH = 65;
  var MAIN_MAP_PIN_MIDDLE_X = Math.ceil(MAIN_MAP_PIN_WIDTH / 2);

  var DragLimit = {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  };

  var similarMapPin = document.querySelector('.map__pins');
  var mainMapPin = similarMapPin.querySelector('.map__pin--main');

  var filterAd = document.querySelector('.ad-form');
  var filterAdress = filterAd.querySelector('#address');

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

      if ((mainMapPin.offsetTop - shift.y) >= (DragLimit.Y.MIN - MAIN_MAP_PIN_HEIGHT) && (mainMapPin.offsetTop - shift.y + MAIN_MAP_PIN_HEIGHT) <= DragLimit.Y.MAX) {
        mainMapPin.style.top = (mainMapPin.offsetTop - shift.y) + 'px';
      }

      if ((mainMapPin.offsetLeft - shift.x) >= (DragLimit.X.MIN - MAIN_MAP_PIN_MIDDLE_X) && (mainMapPin.offsetLeft - shift.x) <= (DragLimit.X.MAX - MAIN_MAP_PIN_MIDDLE_X)) {
        mainMapPin.style.left = (mainMapPin.offsetLeft - shift.x) + 'px';
      }

      var mainMapPinPositionX = parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_MIDDLE_X;
      var mainMapPinPositionY = parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGHT;

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

  window.pinMove = {
    mainMapPinPositionX: filterAdress.value,
  };
})();
