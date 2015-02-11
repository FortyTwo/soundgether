'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio) {

    var vm = this;

    vm.playlist = playlist;
    vm.tracks = [];
    vm.getArtwork = Soundcloud.getArtwork;

    var retrieveTracks = function (tracks) {
      var promises = tracks.map(function (track) {
        return Soundcloud.getTrack(track.id).then(function (res) {
          vm.tracks.push({
            track: res,
            audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
          });
        });
      });
      return $q.all(promises);
    };

    retrieveTracks(vm.playlist.tracks).then(function () {
      vm.currentTrack = vm.tracks[0];
    });

    vm.playPauseTrack = function (track) {
      if (vm.isPlaying(track)) {
        vm.currentTrack.audio.pause();
      } else {
        vm.currentTrack.audio.play();
      }
    };

    vm.isPlaying = function (track) {
      if (track && track.audio && track.audio.audio) {
        return !track.audio.audio.paused;
      } else {
        return false;
      }
    };

    vm.getCurrentTime = function (track) {
      if (track && track.audio) {
        return track.audio.currentTime * 1000;
      } else {
        return 0;
      }
    }

  });
