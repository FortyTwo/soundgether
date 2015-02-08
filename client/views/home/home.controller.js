'use strict';

angular.module('soundgether')
  .controller('HomeCtrl', function ($location, Soundcloud, Playlist, Restangular) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    vm.query = null;
    vm.results = null;
    vm.searchTop = false;
    vm.selectedResult = null;

    vm.search = function (query) {
      vm.selectedResult = null;
      if (!query) {
        vm.results = [];
        return;
      }
      Soundcloud.search(query).then(function (res) {
        vm.results = res;
      });
    };

    vm.getArtwork = function (result, size) {
      var artwork = result.artwork_url;

      if (artwork === null) {
        artwork = result.user.avatar_url;
      }

      return (artwork.replace('large', size));
    };

    vm.getDuration = function (input) {
      var duration = moment.duration(input),
          ret = "";
      if (duration.hours() > 0) {
        ret += ('0' + duration.hours()).slice(-2) + ":";
      }
      if (duration.minutes() > 0) {
        ret += ('0' + duration.minutes()).slice(-2) + ":";
      }
      ret += ('0' + duration.seconds()).slice(-2);
      return ret;
    };

    vm.select = function (result) {
      vm.selectedResult = result;
      vm.query = result.title;
    };

    vm.createPlaylist = function () {
      var track = Restangular.stripRestangular(vm.selectedResult);

      Playlist.create(track)
        .then(function (res) {
          console.log(res);
          $location.path('playlist/' + res._id);
        });
    };

  });
