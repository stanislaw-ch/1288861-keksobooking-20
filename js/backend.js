'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  // var URL_SEND = 'https://javascript.pages.academy/code-and-magick';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var errorHandler = function (message) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: function (onLoad) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    }

    // send: function (data, onError, onLoad) {
    //   var xhr = new XMLHttpRequest();
    //   xhr.responseType = 'json';

    //   xhr.addEventListener('load', function () {
    //     if (xhr.status === StatusCode.OK) {
    //       onLoad('Данные успешно отправлены: ' + xhr.status + ' ' + xhr.statusText);
    //     } else {
    //       onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
    //     }
    //   });
    //   xhr.addEventListener('error', function () {
    //     onError('Произошла ошибка соединения');
    //   });
    //   xhr.addEventListener('timeout', function () {
    //     onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    //   });

    //   xhr.timeout = TIMEOUT_IN_MS;

    //   xhr.open('POST', URL_SEND);
    //   xhr.send(data);
    // }
  };
})();
