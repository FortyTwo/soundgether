'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio) {

    var vm = this;

    vm.playlist = playlist;
    vm.getArtwork = Soundcloud.getArtwork;

    var retrieveTracks = function () {
      var promises = vm.playlist.tracks.map(function (value) {
        return Soundcloud.getTrack(value.id).then(function (res) {
          _.assign(value, {
            track: res
            //audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
          });
        });
      });
      return $q.all(promises);
    };
    retrieveTracks();

    retrieveTracks().then(function () {
      vm.currentTrack = vm.playlist.tracks[0];
      //vm.currentTrack.audio = ngAudio.load(vm.currentTrack.stream_url + '?client_id=' + Soundcloud.getClientId());
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
