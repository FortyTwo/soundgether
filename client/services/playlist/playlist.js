'use strict';

angular.module('soundgether')
  .factory('Playlist', function (Restangular, $http, $q, Soundcloud, ngAudio) {

    return {
      get: function (id) {
        return Restangular.one('playlists', id).get();
      },
      create: function (data) {
        return Restangular.all('playlists').post(data);
      },
      addATrack: function (playlist, trackId) {

        var def = $q.defer();

        $http.put('/api/playlists/' + playlist._id + '/add-track', { trackId: trackId })
          .then(function () {
            Soundcloud.getTrack(trackId).then(function (res) {
              playlist.tracks.push({
                track: res,
                audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
              });
            });
          })
          .catch(function (err) {
            def.reject(err);
          });
        return def.promise;
      }
    }
  });
