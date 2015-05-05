'use strict';

angular.module('soundgether')
  .directive('footer', function () {
    return {
      restrict: 'A',
      templateUrl: 'directives/footer/footer.html'
    };
  });
