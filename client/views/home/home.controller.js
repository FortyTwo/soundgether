'use strict';

angular.module('soundgether')
  .controller('HomeCtrl', function (soundcloud, $animate) {

    var vm = this;

    angular.extend(vm, {
      name: 'HomeCtrl'
    });

    vm.query = null;
    vm.results = null;
    vm.searchTop = false;

    vm.search = function (query) {
      if (!query) {
        vm.results = [];
        return;
      }
      soundcloud.search(query).then(function (res) {
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
    }

  });
