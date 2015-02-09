'use strict';

angular.module('soundgether')
  .directive('backImg', function(){
  return function(scope, element, attrs){
    attrs.$observe('backImg', function(value) {
      element.css({
        'background': 'url(' + value + ') center no-repeat',
        'background-size' : 'cover'
      });
    });
  };
});
