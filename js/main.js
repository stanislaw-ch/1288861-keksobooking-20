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

var MAIN_MAP_PIN_WIDTH = 65;
var MAIN_MAP_PIN_HEIGTH = 65;

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;

var MAX_PRICE_LENGTH = 1000000;
var MAP_PIN_HEIGTH = 85;

var typesMap = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};

var mapBlock = document.querySelector('.map');
var similarMapPin = document.querySelector('.map__pins');
var similarMapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var template = document.querySelector('template');
var popupPhoto = template.content.querySelector('.popup__photo');
var similarCard = document.querySelector('.map');
var filtersContainer = document.querySelector('.map__filters-container');
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var filtersMap = document.querySelector('.map__filters');
var filterAd = document.querySelector('.ad-form');
var mainMapPin = similarMapPin.querySelector('.map__pin--main');

var filterAdress = filterAd.querySelector('#address');
var mainMapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
var mainMapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGTH / 2);
var MapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
var MapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAP_PIN_HEIGTH);

var filterTitleInput = filterAd.querySelector('.ad-form__label');

var filterTypeSelect = filterAd.querySelector('#type');
var filterPriceInput = filterAd.querySelector('#price');
var submit = filterAd.querySelector('.ad-form__submit');

var filterRoomSelect = filterAd.querySelector('#room_number');
var filterCapacitySelect = filterAd.querySelector('#capacity');

var filterTimeInSelect = filterAd.querySelector('#timein');
var filterTimeOutSelect = filterAd.querySelector('#timeout');

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

var onEscDown = function (evt) {
  var MapCardRemove = mapBlock.querySelector('.map__card');
  if (evt.keyCode === 27) {
    MapCardRemove.remove();
  }
};

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
      features: OBJECT.FEATURES,
      description: OBJECT.DESCRIPTION[getRandomFloat(0, OBJECT.DESCRIPTION.length - 1)],
      photos: OBJECT.PHOTOS
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

/**
 * Отрисовывает маркер
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

  mapPinElement.addEventListener('click', function () {
    var MapCardRemove = mapBlock.querySelector('.map__card');
    if (MapCardRemove) {
      MapCardRemove.remove();
    }
    renderCard(mapPin);
    document.addEventListener('keydown', onEscDown);
  });

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

/**
 * Отрисовывает превью из фото в карточке объявления
 * @param {array} card
 * @return {object} photosFragment
 */
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
  cardElement.querySelector('.popup__features').appendChild(createFeatureFragment(card));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
  cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(card));
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  filtersContainer.insertAdjacentElement('beforebegin', cardElement);

  var closeCard = cardElement.querySelector('.popup__close');
  closeCard.addEventListener('click', function () {
    cardElement.remove();
    document.removeEventListener('keydown', onEscDown);
  });

  return cardElement;
};

/**
 * Отрисовывает карточку объявления после активации страницы
 * @param {array} cardData
 */
var renderCardList = function (cardData) {
  var Fragment = document.createDocumentFragment();
  Fragment.appendChild(renderCard(cardData[0]));
  similarCard.insertBefore(Fragment, filtersContainer);
};

/**
 * Переключает поля формы объявления для input, select, textarea в активное или не активное состояние
 * @param {object} name
 * @param {boolean} bDisabled
 */
var toggleFormElementsAdform = function (name, bDisabled) {
  var inputs = name.querySelectorAll('input');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].disabled = bDisabled;
  }
  var selects = name.querySelectorAll('select');
  for (i = 0; i < selects.length; i++) {
    selects[i].disabled = bDisabled;
  }
  var textareas = name.querySelectorAll('textarea');
  for (i = 0; i < textareas.length; i++) {
    textareas[i].disabled = bDisabled;
  }
};

/**
 * Переключает поля фильтра карты select в активное или не активное состояние
 * @param {object} name
 * @param {boolean} bDisabled
 */
var toggleFormElementsMapFilters = function (name, bDisabled) {
  var selects = name.querySelectorAll('select');
  for (var j = 0; j < selects.length; j++) {
    selects[j].disabled = bDisabled;
  }
};

/**
 * Переключает сайт в активное состояние, делает поля форм активными и добавляет координаты в поле с адресом для пина
 */
var enableSite = function () {
  if (mapBlock.classList.contains('map--faded')) {
    mapBlock.classList.remove('map--faded');
    filterAd.classList.remove('ad-form--disabled');
    toggleFormElementsMapFilters(filtersMap, false);
    toggleFormElementsAdform(filterAd, false);
    filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;
    renderPinsMarkup(getMapPins());
    renderCardList(getMapPins());
    document.addEventListener('keydown', onEscDown);
  }
};

/**
 * Переключает значения полей для типа жилья, относительно цены
 * @param {object} selectList
 * @param {object} selectOption
 */
var setFilterByType = function (selectList, selectOption) {
  switch (selectList.value) {
    case 'bungalo':
      selectOption.placeholder = MIN_PRICE_BUNGALO;
      break;
    case 'flat':
      selectOption.placeholder = MIN_PRICE_FLAT;
      break;
    case 'house':
      selectOption.placeholder = MIN_PRICE_HOUSE;
      break;
    case 'palace':
      selectOption.placeholder = MIN_PRICE_PALACE;
      break;
  }
};

/**
 * Отслеживает переключение значений полей для заезда и выезда
 * @param {object} selectList
 * @param {object} selectOption
 */
var setTimeByInOutType = function (selectList, selectOption) {
  switch (selectList.value) {
    case '12:00':
      selectOption.value = '12:00';
      break;
    case '13:00':
      selectOption.value = '13:00';
      break;
    case '14:00':
      selectOption.value = '14:00';
      break;
  }
};

/**
 * Возращает ошибку если валидация количества комнат и количества мест не соответствует заданным параметрам
 * @return {object}
 */
var isValid = function () {
  var valueRooom = parseInt(filterRoomSelect.value, 10);
  var valueCapacity = parseInt(filterCapacitySelect.value, 10);
  if (valueRooom === 1 && valueCapacity > 1 || valueRooom === 1 && valueCapacity === 0) {
    return filterRoomSelect.setCustomValidity('1 комната — для 1 гостя!');
  } else if (valueRooom === 2 && valueCapacity > 2 || valueRooom === 2 && valueCapacity === 0) {
    return filterRoomSelect.setCustomValidity('2 комнаты — для 1 или 2 гостей!');
  } else if (valueRooom === 3 && valueCapacity === 0) {
    return filterRoomSelect.setCustomValidity('3 комнаты — для 1, 2 или 3 гостей!');
  } else if (valueRooom === 100 && valueCapacity !== 0) {
    return filterRoomSelect.setCustomValidity('100 комнат — не для гостей!');
  } else {
    return filterRoomSelect.setCustomValidity('');
  }
};

// Отображает в поле с адрессом координаты главного пина после загрузки страницы
filterAdress.value = mainMapPinPositionX + ', ' + mainMapPinPositionY;

// Переключает поля форм в неактивное состояние
toggleFormElementsMapFilters(filtersMap, true);
toggleFormElementsAdform(filterAd, true);

// Отслеживает клик левой клавиши по пину
mainMapPin.addEventListener('mousedown', function () {
  if (event.which === 1) {
    enableSite();
  }
});

// Отслеживает нажатие клавиши enter по пину
mainMapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    enableSite();
  }
});

// Переключает значения полей для типа жилья, относительно цены
setFilterByType(filterTypeSelect, filterPriceInput);

// Переключает значения полей въезда
setTimeByInOutType(filterTimeInSelect, filterTimeOutSelect);

// Переключает значения полей выезда
setTimeByInOutType(filterTimeOutSelect, filterTimeInSelect);

// Отслеживает переключение значений полей для типа жилья, относительно цены
filterTypeSelect.addEventListener('change', function () {
  setFilterByType(filterTypeSelect, filterPriceInput);
});

// Отслеживает переключение значений полей для поля TimeIn
filterTimeInSelect.addEventListener('change', function () {
  setTimeByInOutType(filterTimeInSelect, filterTimeOutSelect);
});

// Отслеживает переключение значений полей для поля TimeOut
filterTimeOutSelect.addEventListener('change', function () {
  setTimeByInOutType(filterTimeOutSelect, filterTimeInSelect);
});

// Отслеживает нажатие по клавише "Опубликовать"
submit.addEventListener('click', function () {

  // Проверяет поле Title на ошибки
  filterTitleInput.addEventListener('invalid', function () {
    if (filterTitleInput.validity.valueMissing) {
      filterTitleInput.setCustomValidity('Обязательное поле');
    } else {
      filterTitleInput.setCustomValidity('');
    }
  });

  // Проверяет поле Title на ошибки
  filterTitleInput.addEventListener('input', function () {
    var valueLength = filterTitleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      filterTitleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      filterTitleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      filterTitleInput.setCustomValidity('');
    }
  });

  // Проверяет поле Price на ошибки
  filterPriceInput.addEventListener('input', function () {
    var value = filterPriceInput.value;

    if (value > MAX_PRICE_LENGTH) {
      filterPriceInput.setCustomValidity('Введите сумму менее ' + MAX_PRICE_LENGTH);
    } else {
      filterPriceInput.setCustomValidity('');
    }
  });

  isValid();
});
