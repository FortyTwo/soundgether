'use strict';

angular.module('soundgether')
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'vm'
      });
  });
