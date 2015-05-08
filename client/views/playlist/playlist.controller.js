'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio, Playlist) {

    var vm = this;

    vm.playlist = playlist;
    vm.getArtwork = Soundcloud.getArtwork;
    vm.currentTrack = {};
    vm.totalDuration = 0;

    function retrieveTracks () {
      var promises = vm.playlist.tracks.map(function (value) {
        return Soundcloud.getTrack(value.id).then(function (res) {
          vm.totalDuration += res.duration;
          _.assign(value, {
            track: res,
            audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
          });
        });
      });
      return $q.all(promises);
    }

    retrieveTracks().then(function () {
      vm.currentTrack = vm.playlist.tracks[0];
      drawWaveform(vm.currentTrack);
    });

    vm.playPauseTrack = function (track) {
      if (track !== vm.currentTrack) {
        vm.currentTrack.audio.stop();
        drawWaveform(track);
      }
      vm.currentTrack = track;
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
    };

    function drawWaveform (track) {
      var xhr = new XMLHttpRequest();
      var url = '/api/proxy/' + track.track.id;
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        if (this.status === 200) {
          new WaveformGenerator(this.response, {
            bar: {
              align: 'center',
              width: 4,
              gap: 0.2
            },
            waveform: {
              color: '#fbc02d'
            }
          })
            .then(function (svg) {
              $('#wave').html(svg);
            });
        }
      };
      xhr.send();
    }

    vm.deleteTrack = function (track) {
      Playlist.deleteATrack(vm.playlist, track._id).then(function () {
        vm.totalDuration -= track.track.duration;
      });
    };

  });
