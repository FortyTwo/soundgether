'use strict';

angular.module('soundgether')
  .directive('searchResults', function (Soundcloud, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        selectedResult: '=',
        results: '=searchResults',
        query: '=',
        context: '@'
      },
      templateUrl: 'directives/search-results/search-results.html',
      link: function (scope, element) {

        var $resultsBlock = $(element).find('.search-results');

        scope.getArtwork = Soundcloud.getArtwork;

        scope.$watch('results', function (newVal) {
          if (!newVal || !newVal.length) { return; }
          // TODO anim results
        });

        scope.select = function (result) {
          scope.selectedResult = result;
          scope.query = result.title;
        };
      }
    };
  });
