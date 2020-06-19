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

  var filterTypeSelect = filterAd.querySelector('#type');
  var filterPriceInput = filterAd.querySelector('#price');

  var filterTimeInSelect = filterAd.querySelector('#timein');
  var filterTimeOutSelect = filterAd.querySelector('#timeout');

  var mapBlock = document.querySelector('.map');

  var onEscDown = function (evt) {
    var MapCardRemove = mapBlock.querySelector('.map__card');
    if (evt.keyCode === 27) {
      MapCardRemove.remove();
    }
  };

  /**
   * Переключает сайт в активное состояние, делает поля форм активными и добавляет координаты в поле с адресом для пина
   */
  var enableSite = function () {
    if (mapBlock.classList.contains('map--faded')) {
      mapBlock.classList.remove('map--faded');
      filterAd.classList.remove('ad-form--disabled');
      window.form.toggleFormElementsMapFilters(filtersMap, false);
      window.form.toggleFormElementsAdform(filterAd, false);
      filterAdress.value = MapPinPositionX + ', ' + MapPinPositionY;
      window.map.renderPinsMarkup(window.map.getMapPins());
      window.map.renderCardList(window.map.getMapPins());
      document.addEventListener('keydown', onEscDown);
    }
  };

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

  window.main = {
    mapBlock: mapBlock,
    onEscDown: onEscDown
  };
})();
