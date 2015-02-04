'use strict';

angular.module('soundgether', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'restangular'
])
  .config(function ($routeProvider, $locationProvider, RestangularProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    RestangularProvider.setBaseUrl('http://api.soundcloud.com/');
  });
