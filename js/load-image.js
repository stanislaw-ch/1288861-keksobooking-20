'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var ImageParams = {
    HEIGHT: '100%',
    BORDER_RADIUS: '5px',
    ALT: 'Фотография пользователя'
  };

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var emptyPreviewPhoto = document.querySelector('.ad-form__photo');

  var imagesContainer = document.querySelector('.ad-form__photo-container');

  var changeAvatar = function (src) {
    previewAvatar.src = src;
  };

  var addImages = function (src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');
    newImageWrap.classList.add('ad-form__photo');
    newImageWrap.classList.add('ad-form__photo--added');
    image.alt = ImageParams.ALT;
    image.src = src;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImageWrap.appendChild(image);
    imagesContainer.appendChild(newImageWrap);
    removeEmptyImgWrap();
  };

  var filtrationByCorrectType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var addEmptyImgWrap = function () {
    if (!document.querySelector('.ad-form__photo--empty')) {
      var emptyImgWrap = document.createElement('div');
      emptyImgWrap.classList.add('ad-form__photo');
      emptyImgWrap.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImgWrap);
      emptyPreviewPhoto.remove();
    }
  };

  var removeImages = function () {
    previewAvatar.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImgWrap();
  };

  var removeEmptyImgWrap = function () {
    var emptyImgWrap = document.querySelector('.ad-form__photo--empty');
    if (emptyImgWrap) {
      emptyImgWrap.remove();
    }
  };

  var loadFile = function (select, func) {
    var files = Array.from(select.files).filter(filtrationByCorrectType);
    if (files) {
      files.forEach(function (elem) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          func(reader.result);
        });
        reader.readAsDataURL(elem);
      });
    }
  };

  var onAvatarChange = function (evt) {
    loadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    loadFile(evt.target, addImages);
  };


  var activate = function () {
    addEmptyImgWrap();
    fileChooserAvatar.addEventListener('change', onAvatarChange);
    fileChooserPhoto.addEventListener('change', onPhotoChange);
  };

  var deactivate = function () {
    removeImages();
    fileChooserAvatar.removeEventListener('change', onAvatarChange);
    fileChooserPhoto.removeEventListener('change', onPhotoChange);
  };

  window.loadImage = {
    activate: activate,
    deactivate: deactivate
  };
})();
