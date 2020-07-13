'use strict';

(function () {

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var MAX_PRICE_LENGTH = 1000000;

  var filterAd = document.querySelector('.ad-form');
  var filterRoomSelect = filterAd.querySelector('#room_number');
  var filterCapacitySelect = filterAd.querySelector('#capacity');

  var filterTypeSelect = filterAd.querySelector('#type');
  var filterPriceInput = filterAd.querySelector('#price');

  var filterTitleInput = filterAd.querySelector('.ad-form__label');
  var filterTimeInSelect = filterAd.querySelector('#timein');
  var filterTimeOutSelect = filterAd.querySelector('#timeout');

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
    var buttons = name.querySelectorAll('button');
    for (i = 0; i < buttons.length; i++) {
      buttons[i].disabled = bDisabled;
    }
  };

  var setFilterByType = function (selectList, selectOption) {
    switch (selectList.value) {
      case 'bungalo':
        selectOption.min = MIN_PRICE_BUNGALO;
        selectOption.placeholder = MIN_PRICE_BUNGALO;
        break;
      case 'flat':
        selectOption.min = MIN_PRICE_FLAT;
        selectOption.placeholder = MIN_PRICE_FLAT;
        break;
      case 'house':
        selectOption.min = MIN_PRICE_HOUSE;
        selectOption.placeholder = MIN_PRICE_HOUSE;
        break;
      case 'palace':
        selectOption.min = MIN_PRICE_PALACE;
        selectOption.placeholder = MIN_PRICE_PALACE;
        break;
    }
  };

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

  var isRoomValid = function () {
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

  var isTitleValid = function () {
    if (filterTitleInput.validity.valueMissing) {
      filterTitleInput.setCustomValidity('Обязательное поле');
    } else {
      filterTitleInput.setCustomValidity('');
    }
  };

  var isTitleValueLengthValid = function () {
    var valueLength = filterTitleInput.value.length;

    if (valueLength < MIN_TITLE_LENGTH) {
      filterTitleInput.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > MAX_TITLE_LENGTH) {
      filterTitleInput.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
    } else {
      filterTitleInput.setCustomValidity('');
    }
  };

  var isPriceInputValid = function () {
    var value = filterPriceInput.value;

    if (value > MAX_PRICE_LENGTH) {
      filterPriceInput.setCustomValidity('Введите сумму менее ' + MAX_PRICE_LENGTH);
    } else {
      filterPriceInput.setCustomValidity('');
    }
  };

  var onTypeInputChange = function () {
    setFilterByType(filterTypeSelect, filterPriceInput);
  };

  var onTimeInInputChange = function () {
    setTimeByInOutType(filterTimeInSelect, filterTimeOutSelect);
  };

  var onTimeOutInputChange = function () {
    setTimeByInOutType(filterTimeOutSelect, filterTimeInSelect);
  };

  var addFormListeners = function () {
    filterTypeSelect.addEventListener('change', onTypeInputChange);
    filterTimeInSelect.addEventListener('change', onTimeInInputChange);
    filterTimeOutSelect.addEventListener('change', onTimeOutInputChange);
    filterTitleInput.addEventListener('invalid', isTitleValid);
    filterTitleInput.addEventListener('input', isTitleValueLengthValid);
    filterPriceInput.addEventListener('input', isPriceInputValid);
  };

  var removeFormListeners = function () {
    filterTypeSelect.removeEventListener('change', onTypeInputChange);
    filterTimeInSelect.removeEventListener('change', onTimeInInputChange);
    filterTimeOutSelect.removeEventListener('change', onTimeOutInputChange);
    filterTitleInput.removeEventListener('invalid', isTitleValid);
    filterTitleInput.removeEventListener('input', isTitleValueLengthValid);
    filterPriceInput.removeEventListener('input', isPriceInputValid);
  };

  var disableForm = function () {
    toggleFormElementsAdform(filterAd, true);
  };

  var enableForm = function () {
    toggleFormElementsAdform(filterAd, false);
  };

  setFilterByType(filterTypeSelect, filterPriceInput);
  setTimeByInOutType(filterTimeInSelect, filterTimeOutSelect);
  setTimeByInOutType(filterTimeOutSelect, filterTimeInSelect);

  window.form = {
    isRoomValid: isRoomValid,
    isTitleValid: isTitleValid,
    addFormListeners: addFormListeners,
    removeFormListeners: removeFormListeners,
    disableForm: disableForm,
    enableForm: enableForm
  };
})();
