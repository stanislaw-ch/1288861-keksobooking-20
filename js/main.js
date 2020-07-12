'use strict';

(function () {
  var filterAd = document.querySelector('.ad-form');

  var similarMapPin = document.querySelector('.map__pins');
  var mainMapPin = similarMapPin.querySelector('.map__pin--main');

  var submit = filterAd.querySelector('.ad-form__submit');
  var reset = filterAd.querySelector('.ad-form__reset');

  var mapBlock = document.querySelector('.map');

  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var pinsData = [];

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

  var onSuccesEscPress = function (evt) {
    window.utils.onEscDown(evt, closeSucces);
  };

  var onErrorEscPress = function (evt) {
    window.utils.onEscDown(evt, closeError);
  };

  var onSuccesClick = function () {
    var MessageRemove = document.querySelector('.success');
    MessageRemove.remove();
    document.removeEventListener('click', onSuccesClick);
    document.removeEventListener('keydown', onSuccesEscPress);
  };

  var onErrorClick = function () {
    var MessageRemove = document.querySelector('.error');
    MessageRemove.remove();
    document.removeEventListener('click', onErrorClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  var onLoadSucces = function (data) {
    pinsData = data;
    window.map.renderPinsMarkup(pinsData);
    window.map.renderCardList(pinsData);
    window.filter.activate(data);
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
      window.form.enableForm();
      window.map.setFilterAdress();
      window.backend.load(onLoadSucces);
      document.addEventListener('keydown', window.map.onCardEscPress);
      window.loadImage.activate();
      window.form.addFormListeners();
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
      window.form.disableForm();
      document.removeEventListener('keydown', window.map.onCardEscPress);
      window.form.removeFormListeners();
    }
  };

  var onSubmitSuccess = function () {
    upLoadSucces();
    window.pin.removePins();
    filterAd.reset();
    window.map.setMainMapPinPosition();
    disableSite();
    document.addEventListener('keydown', onSuccesEscPress);
    window.loadImage.deactivate();
    window.filter.deactivate();
  };

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

  // Отслеживает нажатие по клавише "Опубликовать"
  submit.addEventListener('click', function () {
    window.form.isRoomValid();
  });

  filterAd.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(filterAd), sendError, onSubmitSuccess);
  });

  // Отслеживает нажатие по клавише "Очистить"
  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    filterAd.reset();
    disableSite();
    window.pin.removePins();
    window.filter.deactivate();
    window.loadImage.deactivate();
    window.form.removeFormListeners();
    window.map.setMainMapPinPosition();
  });
})();
