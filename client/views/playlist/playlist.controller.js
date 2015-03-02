'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio) {

    var vm = this;

    vm.playlist = playlist;
    vm.tracks = [];
    vm.getArtwork = Soundcloud.getArtwork;

    var retrieveTracks = function () {
      angular.forEach(vm.playlist.tracks, function (value) {
        Soundcloud.getTrack(value.id).then(function (res) {
          _.assign(value, {
            track: res
            //audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
          });
        });
      });
      vm.currentTrack = vm.playlist.tracks[0];
      /*var promises = tracks.map(function (track) {
        return Soundcloud.getTrack(track.id).then(function (res) {
          vm.tracks.push({
            track: res,
            audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
          });
        });
      });
      return $q.all(promises);*/
    };
    retrieveTracks();

    /*retrieveTracks().then(function () {
      vm.playlist.tracks = vm.tracks;
      vm.currentTrack = vm.playlist.tracks[0];
    });*/

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
