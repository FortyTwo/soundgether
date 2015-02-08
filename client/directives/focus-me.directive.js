'use strict';

angular.module('soundgether')
  .directive('focusMe', function () {
    return {
      scope: { trigger: '=focusMe' },
      link : function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (value === true) {
            element[0].focus();
            scope.trigger = false;
          }
        });
      }
    };
  });
