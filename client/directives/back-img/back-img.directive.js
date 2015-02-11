'use strict';

angular.module('soundgether')
  .directive('backImg', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        attrs.$observe('backImg', function(value) {
          element.css({
            'background': 'url(' + value + ') center no-repeat',
            'background-size' : 'cover'
          });
        });
      }
    }
  });
