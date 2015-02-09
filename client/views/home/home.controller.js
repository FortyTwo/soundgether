'use strict';

angular.module('soundgether')
  .controller('HomeCtrl', function ($location, Soundcloud, Playlist, Restangular) {

    var vm = this;

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

    vm.getArtwork = Soundcloud.getArtwork;
    vm.getDuration = Soundcloud.getDuration;

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
