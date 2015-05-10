'use strict';
angular.module('soundgether')
  .controller('PlaylistCtrl', function ($q, Soundcloud, playlist, ngAudio, Playlist, $scope, $interval, $timeout) {

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
              width: 3,
              gap: 0.1
            }
          })
            .then(function (svg) {
              $('#waveform').html(svg);
            });
        }
      };
      xhr.send();
    }

    function showCurrentDuration () {
      var $paths = $('#waveform').find('path');
      var totalLength = $paths.length;
      var currentLength = vm.currentTrack.audio.currentTime * 100 / vm.currentTrack.track.duration * 1000;
      $paths.each(function (index) {
        if (index * 100 / totalLength < currentLength) {
          $(this).attr('data-played', true);
        } else {
          $(this).attr('data-played', false);
        }
      });
    }

    $interval(function () {
      showCurrentDuration();
    }, 1000);

    vm.seekTo = function (e, track) {
      var $container = $(e.target).parent();
      var length = e.offsetX;
      var totalLength = $container.width();
      var seekToPercentage = length * 100 / totalLength;
      track.audio.currentTime = seekToPercentage * track.track.duration / 1000 / 100;
      var $paths = $('#waveform').find('path');
      $paths.css('transition', 'none');
      showCurrentDuration();
      // TODO handle it in a better way
      $timeout(function () {
        $paths.css('transition', 'stroke ease 1s');
      }, 200);
    };

    $scope.$on('trackAdded', function (event, track) {
      vm.totalDuration += track.track.duration;
    });

    vm.deleteTrack = function (track) {
      Playlist.deleteATrack(vm.playlist, track._id).then(function () {
        vm.totalDuration -= track.track.duration;
      });
    };

  });
