'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio) {

    var vm = this;

    vm.playlist = playlist;
    vm.getArtwork = Soundcloud.getArtwork;
    vm.currentTrack = {};

    /**
     * Quick and dirty (temporary) solution to request souncloud CDN with CORS headers
     */
    (function() {
      var cors_api_host = 'cors-anywhere.herokuapp.com';
      var cors_api_url = 'https://' + cors_api_host + '/';
      var slice = [].slice;
      var origin = window.location.protocol + '//' + window.location.host;
      var open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
          targetOrigin[1] !== cors_api_host) {
          args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
      };
    })();

    function retrieveTracks () {
      var promises = vm.playlist.tracks.map(function (value) {
        return Soundcloud.getTrack(value.id).then(function (res) {
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
      if (track != vm.currentTrack) {
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
      xhr.open('GET', track.audio.id, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
        if (this.status == 200) {
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
            })
        }
      };
      xhr.send();
    }

  });
