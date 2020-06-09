'use strict';

var PIN_POSITION_X = 50 / 2;
var PIN_POSITION_Y = 70;
var TOTAL_PINS = 8;

var OBJECT = {
  TITLE: [
    'Заголовок объявления 1',
    'Заголовок объявления 2',
    'Заголовок объявления 3',
    'Заголовок объявления 4',
    'Заголовок объявления 5',
    'Заголовок объявления 6',
    'Заголовок объявления 7',
    'Заголовок объявления 8'
  ],
  PRICE: {
    MIN: 1000,
    MAX: 10000
  },
  TYPE: [
    'palace',
    'flat',
    'house ',
    'bungalo'
  ],
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  GUESTS: {
    MIN: 1,
    MAX: 10
  },
  CHECKIN: [
    '12:00',
    '13:00',
    '14:00'
  ],
  CHECKOUT: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  DESCRIPTION: [
    'строка с описанием 1',
    'строка с описанием 2',
    'строка с описанием 3',
    'строка с описанием 4',
    'строка с описанием 5',
    'строка с описанием 6',
    'строка с описанием 7',
    'строка с описанием 8',
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  LOCATION: {
    X: {
      MIN: 0,
      MAX: 1200
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  }
};

/**
 * Возвращает случайное число в заданном диапозоне
 * @param {number} min
 * @param {number} max
 *
 * @return {number} randNumber
 */
function getRandomFloat(min, max) {
  var randNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randNumber;
}

/**
 * Возвращает сгенерированный объект
 * @param {number} i
 *
 * @return {object} array
 */

var getMapPinObject = function (i) {
  var mapPin = {
    author: {
      avatar: 'img/avatars/user' + '0' + (i + 1) + '.png'
    },
    offer: {
      title: OBJECT.TITLE[i],
      price: getRandomFloat(OBJECT.PRICE.MIN, OBJECT.PRICE.MAX),
      type: OBJECT.TYPE[getRandomFloat(0, OBJECT.TYPE.length - 1)],
      rooms: getRandomFloat(OBJECT.ROOMS.MIN, OBJECT.ROOMS.MAX),
      guests: getRandomFloat(OBJECT.GUESTS.MIN, OBJECT.GUESTS.MAX),
      checkin: OBJECT.CHECKIN[getRandomFloat(0, OBJECT.CHECKIN.length - 1)],
      checkout: OBJECT.CHECKOUT[getRandomFloat(0, OBJECT.CHECKOUT.length - 1)],
      features: OBJECT.FEATURES[getRandomFloat(0, OBJECT.FEATURES.length - 1)],
      description: OBJECT.DESCRIPTION[getRandomFloat(0, OBJECT.DESCRIPTION.length - 1)],
      photos: OBJECT.PHOTOS[getRandomFloat(0, OBJECT.PHOTOS.length - 1)],
    },
    location: {
      x: getRandomFloat(OBJECT.LOCATION.X.MIN, OBJECT.LOCATION.X.MAX) - PIN_POSITION_X,
      y: getRandomFloat(OBJECT.LOCATION.Y.MIN, OBJECT.LOCATION.Y.MAX) - PIN_POSITION_Y
    }
  };
  mapPin.offer.address = mapPin.location.x + ', ' + mapPin.location.y;
  return mapPin;
};


/**
 * Возвращает массив из объектов
 * @param {number} number
 *
 * @return {array} array
 */
var getMapPins = function () {
  var array = [];
  for (var i = 0; i < TOTAL_PINS; i++) {
    array[i] = getMapPinObject(i);
  }
  return array;
};

// console.log(getMapPins());

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var similarMapPin = document.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/**
 * Отрисовывает карточку
 * @param {array} mapPin
 *
 * @return {array} mapPinElement
 */
var renderMapPin = function (mapPin) {
  var mapPinElement = similarMapPinTemplate.cloneNode(true);

  mapPinElement.style.top = mapPin.location.y + 'px';
  mapPinElement.style.left = mapPin.location.x + 'px';
  mapPinElement.querySelector('img').alt = mapPin.offer.title;
  mapPinElement.querySelector('img').src = mapPin.author.avatar;

  return mapPinElement;
};

/**
 * Отрисовывает метки на карте
 * @param {array} pinsData
 */
var renderPinsMarkup = function (pinsData) {
  var Fragment = document.createDocumentFragment();
  for (var j = 0; j < pinsData.length; j++) {
    Fragment.appendChild(renderMapPin(pinsData[j]));
  }
  similarMapPin.appendChild(Fragment);
};

renderPinsMarkup(getMapPins());

var similarCardPin = document.querySelector('.map');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
/**
 * Отрисовывает карточку
 * @param {array} card
 *
 * @return {array} cardElement
 */
var renderCard = function (card) {
  var cardElement = similarCardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = typesMap[card.offer.type];
  cardElement.querySelector('.popup__text--capacity')
    .textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  return cardElement;
};

/**
 * Отрисовывает метки на карте
 * @param {array} cardData
 */
var renderCardList = function (cardData) {
  var Fragment = document.createDocumentFragment();
  // for (var j = 0; j < cardData.length; j++) {
  Fragment.appendChild(renderCard(cardData[0]));
  // }
  similarCardPin.appendChild(Fragment);
};

renderCardList(getMapPins());
