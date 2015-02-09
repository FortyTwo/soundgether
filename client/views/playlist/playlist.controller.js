'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist) {

    var vm = this;

    vm.playlist = playlist;
    vm.tracks = [];

    var retrieveTracks = function (tracks) {
      var promises = tracks.map(function (track) {
        return Soundcloud.getTrack(track.id).then(function (res) {
          vm.tracks.push(res);
        });
      });
      return $q.all(promises);
    };

    retrieveTracks(vm.playlist.tracks).then(function () {
      vm.currentTrack = vm.tracks[0];
    });

    vm.getArtwork = Soundcloud.getArtwork;
    vm.getDuration = Soundcloud.getDuration;

  });
