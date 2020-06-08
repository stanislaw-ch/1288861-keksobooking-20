'use strict';

var PIN_POSITION_X = 70 / 2;
var PIN_POSITION_Y = 50 / 2;

var AVATAR = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];

var TITLE = [
  'Заголовок объявления 1',
  'Заголовок объявления 2',
  'Заголовок объявления 3',
  'Заголовок объявления 4',
  'Заголовок объявления 5',
  'Заголовок объявления 6',
  'Заголовок объявления 7',
  'Заголовок объявления 8'
];

var ADDRESS = [
  '601, 350',
  '602, 350',
  '603, 350',
  '604, 350',
  '605, 350',
  '606, 350',
  '607, 350',
  '608, 350'
];

var PRICE = [
  '01 руб.',
  '02 руб.',
  '03 руб.',
  '04 руб.',
  '05 руб.',
  '06 руб.',
  '07 руб.',
  '08 руб.'
];

var TYPE = [
  'palace',
  'flat',
  'house ',
  'bungalo'
];

var ROOMS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08'
];

var GUESTS = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8'
];

var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var DESCRIPTION = [
  'строка с описанием 1',
  'строка с описанием 2',
  'строка с описанием 3',
  'строка с описанием 4',
  'строка с описанием 5',
  'строка с описанием 6',
  'строка с описанием 7',
  'строка с описанием 8',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

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
 * Возвращает массив
 * @param {array} mapPin
 *
 * @return {array} array
 */
var getArr = function (mapPin) {
  var array = [];
  for (var i = 0; i < mapPin.length; i++) {
    var j = mapPin[getRandomFloat(0, mapPin.length - 1)];
    array = [j];
  }
  return array;

};

var mapPins = [
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  },
  {
    author: {
      avatar: getArr(AVATAR)
    },
    offer: {
      title: getArr(TITLE),
      address: getArr(ADDRESS),
      price: getArr(PRICE),
      type: getArr(TYPE),
      rooms: getArr(ROOMS),
      guests: getArr(GUESTS),
      checkin: getArr(CHECKIN),
      checkout: getArr(CHECKOUT),
      features: getArr(FEATURES),
      description: getArr(DESCRIPTION),
      photos: getArr(PHOTOS)
    },
    location: {
      x: getRandomFloat(0, 1200) + PIN_POSITION_X,
      y: getRandomFloat(130, 630) + PIN_POSITION_Y
    }
  }
];

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

// Содержит пустой фрагмент
var fragment = document.createDocumentFragment();
for (var i = 0; i < mapPins.length; i++) {
  fragment.appendChild(renderMapPin(mapPins[i]));
}
similarMapPin.appendChild(fragment);
