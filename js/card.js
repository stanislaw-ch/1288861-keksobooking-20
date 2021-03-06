'use strict';

(function () {

  var TypesMap = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };
  var template = document.querySelector('template');
  var popupPhoto = template.content.querySelector('.popup__photo');
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');

  var createPhotosFragment = function (card) {
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < card.offer.photos.length; i++) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = card.offer.photos[i];
      photosFragment.appendChild(popupPhotoItem);
    }
    return photosFragment;
  };

  var createFeatureFragment = function (card) {
    var featureFragment = document.createDocumentFragment();
    for (var j = 0; j < card.offer.features.length; j++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + card.offer.features[j];
      featureFragment.appendChild(featureItem);
    }
    return featureFragment;
  };

  var renderCard = function (card) {
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypesMap[card.offer.type];
    cardElement.querySelector('.popup__text--capacity')
      .textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time')
      .textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__features').innerHTML = '';
    cardElement.querySelector('.popup__features').appendChild(createFeatureFragment(card));
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
    cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    filtersContainer.insertAdjacentElement('beforebegin', cardElement);

    var closeCard = cardElement.querySelector('.popup__close');
    closeCard.addEventListener('click', function () {
      cardElement.remove();
      document.removeEventListener('keydown', window.main.onCardEscPress);
    });

    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
