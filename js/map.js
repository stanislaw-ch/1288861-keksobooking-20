'use strict';

(function () {
  var MAX_PIN_COUNT = 5;

  var MAIN_MAP_PIN_WIDTH = 65;
  var MAIN_MAP_PIN_HEIGTH = 65;
  var MAP_PIN_HEIGTH = 85;
  var MAP_PIN_POSITION_LEFT = '570px';
  var MAP_PIN_POSITION_TOP = '375px';


  var filterAd = document.querySelector('.ad-form');
  var filterAdress = filterAd.querySelector('#address');

  var mapBlock = document.querySelector('.map');

  var similarMapPin = document.querySelector('.map__pins');
  var mainMapPin = similarMapPin.querySelector('.map__pin--main');
  var mapPin = similarMapPin.querySelector('.map__pin');

  var mainMapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
  var mainMapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGTH / 2);
  var MapPinPositionX = Math.floor(parseInt(mapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
  var MapPinPositionY = Math.floor(parseInt(mapPin.style.top, 10) + MAP_PIN_HEIGTH);

  var renderPinsMarkup = function (pinsData) {
    var takeNumber = pinsData.length > MAX_PIN_COUNT ? MAX_PIN_COUNT : pinsData.length;
    var Fragment = document.createDocumentFragment();
    for (var j = 0; j < takeNumber; j++) {
      Fragment.appendChild(window.pin.renderMapPin(pinsData[j]));
    }
    similarMapPin.appendChild(Fragment);
  };

  var closeCard = function () {
    var MapCardRemove = mapBlock.querySelector('.map__card');
    MapCardRemove.remove();
  };

  var onCardEscPress = function (evt) {
    window.utils.onEscDown(evt, closeCard);
  };

  var setFilterAdress = function () {
    filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;
  };

  var setMainMapPinPosition = function () {
    mainMapPin.style.left = MAP_PIN_POSITION_LEFT;
    mainMapPin.style.top = MAP_PIN_POSITION_TOP;
    filterAdress.value = mainMapPinPositionX + ', ' + mainMapPinPositionY;
  };

  filterAdress.value = mainMapPinPositionX + ', ' + mainMapPinPositionY;

  window.map = {
    renderPinsMarkup: renderPinsMarkup,
    onCardEscPress: onCardEscPress,
    setFilterAdress: setFilterAdress,
    setMainMapPinPosition: setMainMapPinPosition
  };
})();
