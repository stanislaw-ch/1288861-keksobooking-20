'use strict';

// form.js — модуль, который работает с формой объявления.
(function () {

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var filterAd = document.querySelector('.ad-form');
  var filterRoomSelect = filterAd.querySelector('#room_number');
  var filterCapacitySelect = filterAd.querySelector('#capacity');

  window.form = {
    /**
     * Переключает поля формы объявления для input, select, textarea в активное или не активное состояние
     * @param {object} name
     * @param {boolean} bDisabled
     */
    toggleFormElementsAdform: function (name, bDisabled) {
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
    },

    /**
     * Переключает поля фильтра карты select в активное или не активное состояние
     * @param {object} name
     * @param {boolean} bDisabled
     */
    toggleFormElementsMapFilters: function (name, bDisabled) {
      var selects = name.querySelectorAll('select');
      for (var j = 0; j < selects.length; j++) {
        selects[j].disabled = bDisabled;
      }
    },

    /**
     * Переключает значения полей для типа жилья, относительно цены
     * @param {object} selectList
       * @param {object} selectOption
       */
    setFilterByType: function (selectList, selectOption) {
      switch (selectList.value) {
        case 'bungalo':
          selectOption.min = 0;
          selectOption.placeholder = MIN_PRICE_BUNGALO;
          break;
        case 'flat':
          selectOption.min = 1000;
          selectOption.placeholder = MIN_PRICE_FLAT;
          break;
        case 'house':
          selectOption.min = 5000;
          selectOption.placeholder = MIN_PRICE_HOUSE;
          break;
        case 'palace':
          selectOption.min = 10000;
          selectOption.placeholder = MIN_PRICE_PALACE;
          break;
      }
    },

    /**
     * Отслеживает переключение значений полей для заезда и выезда
     * @param {object} selectList
     * @param {object} selectOption
     */
    setTimeByInOutType: function (selectList, selectOption) {
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
    },

    /**
     * Возращает ошибку если валидация количества комнат и количества мест не соответствует заданным параметрам
     * @return {object}
     */
    isValid: function () {
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
    }
  };
})();
