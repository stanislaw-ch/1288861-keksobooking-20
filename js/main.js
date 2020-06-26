'use strict';

// main.js — точка входа. Модуль, который связывает другие модули;
(function () {

  var MAIN_MAP_PIN_WIDTH = 65;
  var MAIN_MAP_PIN_HEIGTH = 65;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var MAX_PRICE_LENGTH = 1000000;
  var MAP_PIN_HEIGTH = 85;


  var filtersMap = document.querySelector('.map__filters');
  var filterAd = document.querySelector('.ad-form');

  var similarMapPin = document.querySelector('.map__pins');
  var mainMapPin = similarMapPin.querySelector('.map__pin--main');

  var filterAdress = filterAd.querySelector('#address');
  var mainMapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
  var mainMapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAIN_MAP_PIN_HEIGTH / 2);
  var MapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
  var MapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAP_PIN_HEIGTH);

  var filterTitleInput = filterAd.querySelector('.ad-form__label');
  var submit = filterAd.querySelector('.ad-form__submit');
  var reset = filterAd.querySelector('.ad-form__reset');

  var filterTypeSelect = filterAd.querySelector('#type');
  var filterPriceInput = filterAd.querySelector('#price');

  var filterTimeInSelect = filterAd.querySelector('#timein');
  var filterTimeOutSelect = filterAd.querySelector('#timeout');

  var mapBlock = document.querySelector('.map');

  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var pinsData = [];
  var housingTypeSelect = filtersMap.querySelector('#housing-type');

  var onEscDown = function (evt, action) {
    if (evt.keyCode === 27) {
      action();
    }
  };

  var closeCard = function () {
    var MapCardRemove = mapBlock.querySelector('.map__card');
    MapCardRemove.remove();
    // document.removeEventListener('keydown', onCardEscPress);
  };

  var closeSucces = function () {
    var successMessage = document.querySelector('.success');
    successMessage.remove();
    document.removeEventListener('keydown', onSuccesEscPress);
    document.removeEventListener('click', onSuccesClick);
  };

  var closeError = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorClick);
  };


  var onCardEscPress = function (evt) {
    onEscDown(evt, closeCard);
  };

  var onSuccesEscPress = function (evt) {
    onEscDown(evt, closeSucces);
  };

  var onErrorEscPress = function (evt) {
    onEscDown(evt, closeError);
  };


  var onSuccesClick = function () {
    var MapCardRemove = document.querySelector('.success');
    MapCardRemove.remove();
    document.removeEventListener('click', onSuccesClick);
    document.removeEventListener('keydown', onSuccesEscPress);
  };

  var onErrorClick = function () {
    var MapCardRemove = document.querySelector('.error');
    MapCardRemove.remove();
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onLoadSucces = function (data) {
    pinsData = data;
    window.map.renderPinsMarkup(pinsData);
    window.map.renderCardList(pinsData);

    window.form.toggleFormElementsMapFilters(filtersMap, false);
  };

  var removePins = function () {
    var similarPins = document.querySelectorAll('.map__pin');
    var similarCard = document.querySelector('.map__card');
    var isSimilarCard = !!document.querySelector('.map__card');
    for (var i = 1; i < similarPins.length; i++) {
      similarPins[i].remove();
    }
    if (isSimilarCard) {
      similarCard.remove();
    }
  };

  var updatePins = function () {
    var housingType = pinsData.filter(function (it) {
      return it.offer.type === housingTypeSelect.value;
    });
    removePins();
    window.map.renderPinsMarkup(housingType);
  };

  var upLoadSucces = function () {
    var Fragment = success.cloneNode(true);
    main.appendChild(Fragment);
    document.addEventListener('keydown', onSuccesEscPress);
    document.addEventListener('click', onSuccesClick);
  };

  var sendError = function () {
    var Fragment = error.cloneNode(true);
    main.appendChild(Fragment);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
  };

  /**
   * Переключает сайт в активное состояние, отрисовывает пины на карте, карту с объявлением,
   * делает поля форм активными и добавляет координаты в поле с адресом для пина.
   */
  var enableSite = function () {
    if (mapBlock.classList.contains('map--faded')) {
      mapBlock.classList.remove('map--faded');
      filterAd.classList.remove('ad-form--disabled');
      window.form.toggleFormElementsAdform(filterAd, false);
      filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;

      window.backend.load(onLoadSucces);
      document.addEventListener('keydown', onCardEscPress);
    }
  };

  /**
   * Переключает сайт в неактивное состояние, отрисовывает пины на карте, карту с объявлением,
   * делает поля форм активными и добавляет координаты в поле с адресом для пина.
   */
  var disableSite = function () {
    if (!mapBlock.classList.contains('map--faded')) {
      mapBlock.classList.add('map--faded');
      filterAd.classList.add('ad-form--disabled');
      window.form.toggleFormElementsMapFilters(filtersMap, true);
      window.form.toggleFormElementsAdform(filterAd, true);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  // Фильтрует объявления по типу жилья
  housingTypeSelect.addEventListener('change', function () {
    updatePins();
  });

  // Отображает в поле с адрессом координаты главного пина после загрузки страницы
  filterAdress.value = mainMapPinPositionX + ', ' + mainMapPinPositionY;

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

  // Отслеживает переключение значений полей для типа жилья, относительно цены
  filterTypeSelect.addEventListener('change', function () {
    window.form.setFilterByType(filterTypeSelect, filterPriceInput);
  });

  // Отслеживает переключение значений полей для поля TimeIn
  filterTimeInSelect.addEventListener('change', function () {
    window.form.setTimeByInOutType(filterTimeInSelect, filterTimeOutSelect);
  });

  // Отслеживает переключение значений полей для поля TimeOut
  filterTimeOutSelect.addEventListener('change', function () {
    window.form.setTimeByInOutType(filterTimeOutSelect, filterTimeInSelect);
  });

  var onSubmitSuccess = function () {
    upLoadSucces();
    removePins();
    filterAd.reset();
    filtersMap.reset();
    filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;
    disableSite();
    document.addEventListener('keydown', onSuccesEscPress);
  };


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
    window.form.isValid();
  });


  filterAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(filterAd), sendError, onSubmitSuccess);
  });


  // Отслеживает нажатие по клавише "Очистить"
  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterAd.reset();
    MapPinPositionX = Math.floor(parseInt(mainMapPin.style.left, 10) + MAIN_MAP_PIN_WIDTH / 2);
    MapPinPositionY = Math.floor(parseInt(mainMapPin.style.top, 10) + MAP_PIN_HEIGTH);
    filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;
  });

  window.main = {
    mapBlock: mapBlock,
    onCardEscPress: onCardEscPress,
    disableSite: disableSite
  };
})();
