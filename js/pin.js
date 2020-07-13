'use strict';

(function () {

  var mapBlock = document.querySelector('.map');
  var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderMapPin = function (mapPin) {
    var mapPinElement = similarMapPinTemplate.cloneNode(true);

    mapPinElement.style.top = mapPin.location.y + 'px';
    mapPinElement.style.left = mapPin.location.x + 'px';
    mapPinElement.querySelector('img').alt = mapPin.offer.title;
    mapPinElement.querySelector('img').src = mapPin.author.avatar;

    mapPinElement.addEventListener('click', function () {
      var MapCardRemove = mapBlock.querySelector('.map__card');
      if (MapCardRemove) {
        MapCardRemove.remove();
      }
      window.card.renderCard(mapPin);
    });

    return mapPinElement;
  };

  var removePins = function () {
    var similarPins = document.querySelectorAll('.map__pin');
    var similarCard = document.querySelector('.map__card');
    var isSimilarCard = !!similarCard;
    for (var i = 1; i < similarPins.length; i++) {
      similarPins[i].remove();
    }
    if (isSimilarCard) {
      similarCard.remove();
    }
  };

  window.pin = {
    renderMapPin: renderMapPin,
    removePins: removePins
  };
})();
