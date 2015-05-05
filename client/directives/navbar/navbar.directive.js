'use strict';

angular.module('soundgether')
  .directive('navbar', function () {
    return {
      restrict: 'A',
      templateUrl: 'directives/navbar/navbar.html'
    };
  });
