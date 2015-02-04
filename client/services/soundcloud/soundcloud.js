'use strict';

angular.module('soundgether')
  .service('soundcloud', function (Restangular) {

    var clientId = 'ce442c9ae9f8ef31ed36d65d5c089a1b';

    return {
      search: function (query) {
        return Restangular.all('tracks').getList({q: query, limit: 10, client_id: clientId});
      }
    }
  });
