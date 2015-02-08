'use strict';

angular.module('soundgether')
  .controller('PlaylistCtrl', function (Restangular, playlist) {

    var vm = this;

    angular.extend(vm, {
      name: 'PlaylistCtrl'
    });

    vm.playlist = Restangular.stripRestangular(playlist);

  });
