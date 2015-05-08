'use strict';

angular.module('soundgether')
  .directive('searchInput', function (Playlist, Restangular, Soundcloud, $location) {
    return {
      restrict: 'EA',
      scope: {
        searchTop: '=?',
        context: '@',
        query: '=?',
        playlist: '=?',
        duration: '=?'
      },
      templateUrl: 'directives/search-input/search-input.html',
      link: function (scope) {

        scope.query = null;
        scope.results = null;
        scope.searchTop = false;
        scope.selectedResult = null;
        scope.focus = (scope.context === 'home');

        scope.search = function (query) {
          scope.selectedResult = null;
          if (!query) {
            scope.results = [];
            return;
          }
          Soundcloud.search(query).then(function (res) {
            scope.results = res;
          });
        };

        scope.createPlaylist = function () {
          var track = Restangular.stripRestangular(scope.selectedResult);
          Playlist.create(track)
            .then(function (res) {
              $location.path('playlist/' + res._id);
            });
        };

        scope.addATrack = function () {
          Playlist.addATrack(scope.playlist, scope.selectedResult.id).then(function () {
            scope.duration += scope.selectedResult.duration;
            scope.query = null;
            scope.selectedResult = null;
          });
        };
      }
    };
  });
