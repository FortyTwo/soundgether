'use strict';

angular.module('soundgether')
  .service('Soundcloud', function (Restangular) {

    var clientId = 'ce442c9ae9f8ef31ed36d65d5c089a1b';

    var SCRestangular = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://api.soundcloud.com/');
    });

    return {
      search: function (query) {
        return SCRestangular.all('tracks').getList({q: query, limit: 10, client_id: clientId});
      }
    }
  });
