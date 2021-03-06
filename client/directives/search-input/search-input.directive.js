'use strict';

angular.module('soundgether')
  .directive('searchInput', function (Playlist, Restangular, Soundcloud, $location, $timeout) {
    return {
      restrict: 'EA',
      scope: {
        context: '@',
        query: '=?',
        playlist: '=?'
      },
      templateUrl: 'directives/search-input/search-input.html',
      link: function (scope, el) {

        var $el = $(el);

        scope.query = null;
        scope.results = null;
        scope.selectedResult = null;
        scope.focus = (scope.context === 'home');

        scope.search = function (query) {
          if (!query || query.length < 4) {
            hideTongue();
            scope.results = [];
            return;
          }
          showTongue();
          searchDebounced(query);
        };

        var searchDebounced = _.debounce(function (query) {
          doSearch(query);
        }, 250);

        function doSearch (query) {
          scope.selectedResult = null;
          Soundcloud.search(query).then(function (res) {
            hideTongue();
            $timeout(function () {
              scope.results = res;
            }, 200);
          });
        }

        scope.createPlaylist = function () {
          var track = Restangular.stripRestangular(scope.selectedResult);
          Playlist.create(track)
            .then(function (res) {
              $location.path('playlist/' + res._id);
            });
        };

        scope.addATrack = function () {
          Playlist.addATrack(scope.playlist, scope.selectedResult.id).then(function (track) {
            scope.$emit('trackAdded', track);
            scope.query = null;
            scope.selectedResult = null;
          });
        };

        /**
         * Animations
         */
        var $tongue = $el.find('.search-input--loader');
        TweenMax.set($tongue, { opacity: 0, y: 0 });

        function showTongue () {
          TweenMax.to($tongue, 0.25, { opacity: 1, y: 50 });

        }

        function hideTongue () {
          TweenMax.to($tongue, 0.25, { opacity: 0, y: 0 });
        }

        /**
         * Wonderful waves
         */

        $el.on('keydown', _.throttle(function () { addWave(); }, 400));
        $el.on('click', function () { addWave(true); });

        addWave();

        function addWave (rotate) {

          var wave = document.createElement('div');
          wave.classList.add('search-input--wave');
          TweenMax.set(wave, { opacity: 1, scaleX: 1, scaleY: 1 });

          $el.prepend(wave);
          TweenMax.to(wave, 1, { opacity: 0, scaleX: 1.5, scaleY: 2 });

          setTimeout(function () {
            $(wave).remove();
          }, 1e3);

          if (rotate) {
            new TimelineMax()
              .to(el, 0.1, { rotation: 1 })
              .to(el, 0.1, { rotation: -1 })
              .to(el, 0.1, { rotation: 0 });
          }

        }

      }
    };
  });
