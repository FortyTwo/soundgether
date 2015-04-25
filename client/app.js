'use strict';

angular.module('soundgether', [
  'ngRoute',
  'ngCookies',
  'ngAnimate',
  'btford.socket-io',
  'restangular',
  'ngAudio'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider, RestangularProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
    $httpProvider.interceptors.push('authInterceptor');

  })
  .factory('authInterceptor',
  function ($rootScope, $q, $cookieStore, $location) {
    return {

      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      responseError: function (response) {
        if (response.status === 401) {
          $location.path('/login');
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }

    };
  })

  .run(function ($rootScope, Auth) {

    $rootScope.Auth = Auth;

  });
