'use strict';

angular.module('soundgether')
  .directive('searchResults', function (Soundcloud) {
    return {
      restrict: 'EA',
      scope: {
        selectedResult: '=',
        results: '=searchResults',
        query: '=',
        context: '@'
      },
      templateUrl: 'directives/search-results/search-results.html',
      link: function (scope) {
        scope.getArtwork = Soundcloud.getArtwork;

        scope.select = function (result) {
          scope.selectedResult = result;
          scope.query = result.title;
        };
      }
    };
  });
