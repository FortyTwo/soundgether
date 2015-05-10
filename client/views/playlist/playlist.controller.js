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
        vm.currentTrack.audio.pause();
        vm.currentTrack.isPlaying = false;
        drawWaveform(track);
        vm.currentTrack = track;
      }
      if (vm.isPlaying(track)) {
        track.isPlaying = false;
        vm.currentTrack.audio.pause();
      } else {
        track.isPlaying = true;
        vm.currentTrack.audio.play();
      }
    };

    vm.isFirstTrack = function (track) {
      return track === vm.playlist.tracks[0];
    };

    vm.isLastTrack = function (track) {
      return track === _.last(vm.playlist.tracks);
    };

    vm.nextTrack = function (track) {
      var index = _.findIndex(vm.playlist.tracks, function (item) {
        return item._id === track._id;
      });
      if (index < vm.playlist.tracks.length - 1) {
        vm.currentTrack.audio.pause();
        vm.currentTrack.isPlaying = false;
        vm.currentTrack = vm.playlist.tracks[index + 1];
        vm.currentTrack.audio.play();
        vm.currentTrack.isPlaying = true;
        drawWaveform(vm.currentTrack);
      }
    };

    vm.previousTrack = function (track) {
      var index = _.findIndex(vm.playlist.tracks, function (item) {
        return item._id === track._id;
      });
      if (index > 0) {
        vm.currentTrack.audio.pause();
        vm.currentTrack.isPlaying = false;
        vm.currentTrack = vm.playlist.tracks[index - 1];
        vm.currentTrack.audio.play();
        vm.currentTrack.isPlaying = true;
        drawWaveform(vm.currentTrack);
      }
    };

    vm.isPlaying = function (track) {
      return !!track.isPlaying;
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
      var currentLength = vm.currentTrack.audio.progress * 100;
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
      if (vm.currentTrack.audio.remaining === 0) {
        vm.nextTrack(vm.currentTrack);
      }
    }, 1000);

    vm.seekTo = function (e, track) {
      var $container = $(e.target).parent();
      var length = e.offsetX;
      var totalLength = $container.width();
      track.audio.progress = length / totalLength;
      var $paths = $('#waveform').find('path');
      $paths.css('transition', 'none');
      showCurrentDuration();
      // TODO handle it in a better way
      $timeout(function () {
        $paths.css('transition', 'stroke ease 1s');
      }, 500);
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
