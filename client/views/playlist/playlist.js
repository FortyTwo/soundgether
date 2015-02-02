'use strict';

angular.module('soundgether')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/playlist/:id', {
        templateUrl: 'views/playlist/playlist.html',
        controller: 'PlaylistCtrl',
        controllerAs: 'vm'
      });
  });
