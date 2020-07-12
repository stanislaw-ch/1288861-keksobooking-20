'use strict';

(function () {
  var PINS_LIMIT = 5;

  var filter = document.querySelector('.map__filters');
  var filterItems = filter.querySelectorAll('select, input');
  var featuresFieldset = filter.querySelector('#housing-features');
  var housingType = 'any';
  var housingPrice = 'any';
  var housingRooms = 'any';
  var housingGuests = 'any';
  var filtersMap = document.querySelector('.map__filters');
  var housingTypeSelect = filtersMap.querySelector('#housing-type');
  var housingPriceSelect = filtersMap.querySelector('#housing-price');
  var housingRoomsSelect = filtersMap.querySelector('#housing-rooms');
  var housingGuestsSelect = filtersMap.querySelector('#housing-guests');
  var housingFeaturesSelect = filtersMap.querySelector('#housing-features');
  var pinsData = [];
  var filteredPins = [];

  var sameHousingType = function (it) {
    return housingType === 'any' ? true : it.offer.type === housingType;
  };

  var sameHousingPrice = function (it) {
    var housingPriceOnSelect;
    switch (housingPrice) {
      case 'any':
        return true;
      case 'low':
        housingPriceOnSelect = it.offer.price <= 10000;
        break;
      case 'middle':
        housingPriceOnSelect = it.offer.price >= 10000 && it.offer.price <= 50000;
        break;
      case 'high':
        housingPriceOnSelect = it.offer.price >= 50000;
        break;
      default:
        return true;
    }
    return housingPriceOnSelect;
  };

  var sameHousingRooms = function (it) {
    var housingRoomsOnSelect;
    switch (housingRooms) {
      case 'any':
        return true;
      case '1':
        housingRoomsOnSelect = it.offer.rooms <= 1;
        break;
      case '2':
        housingRoomsOnSelect = it.offer.rooms > 1 && it.offer.rooms <= 2;
        break;
      case '3':
        housingRoomsOnSelect = it.offer.rooms > 2 && it.offer.rooms <= 3;
        break;
      default:
        return true;
    }
    return housingRoomsOnSelect;
  };

  var sameHousingGuests = function (it) {
    var housingGuestsOnSelect;
    switch (housingGuests) {
      case 'any':
        return true;
      case '1':
        housingGuestsOnSelect = it.offer.guests > 0 && it.offer.guests <= 1;
        break;
      case '2':
        housingGuestsOnSelect = it.offer.guests > 1 && it.offer.guests <= 2;
        break;
      case '0':
        housingGuestsOnSelect = it.offer.guests >= 0 && it.offer.guests <= 0;
        break;
      default:
        return true;
    }
    return housingGuestsOnSelect;
  };

  var sameHousingFeatures = function (it) {
    var checkedFeaturesItems = housingFeaturesSelect.querySelectorAll('input:checked');
    return Array.from(checkedFeaturesItems).every(function (element) {
      return it.offer.features.includes(element.value);
    });
  };

  var onFilterChange = window.utils.debounce(function (evt) {
    if (evt.target.id === housingTypeSelect.id) {
      housingType = evt.target.value;
    }
    if (evt.target.id === housingPriceSelect.id) {
      housingPrice = evt.target.value;
    }
    if (evt.target.id === housingRoomsSelect.id) {
      housingRooms = evt.target.value;
    }
    if (evt.target.id === housingGuestsSelect.id) {
      housingGuests = evt.target.value;
    }

    filteredPins = pinsData.slice(0);
    filteredPins = filteredPins
      .filter(sameHousingType)
      .filter(sameHousingPrice)
      .filter(sameHousingRooms)
      .filter(sameHousingGuests)
      .filter(sameHousingFeatures);

    window.pin.removePins();

    window.map.renderPinsMarkup(filteredPins);
  });

  var activateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = false;
    });
    filter.addEventListener('change', onFilterChange);
  };

  var resetFilter = function () {
    filterItems.forEach(function (it) {
      it.value = 'any';
    });
    var featuresItems = featuresFieldset.querySelectorAll('input');
    featuresItems.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var deactivateFilter = function () {
    filterItems.forEach(function (it) {
      it.disabled = true;
    });
    resetFilter();
    filter.removeEventListener('change', onFilterChange);
  };

  var activateFiltration = function (Data) {
    pinsData = Data.slice(0);
    activateFilter();
    return Data.slice(0, PINS_LIMIT);
  };

  var deactivateFiltration = function () {
    deactivateFilter();
  };

  window.filter = {
    activate: activateFiltration,
    deactivate: deactivateFiltration
  };
})();
