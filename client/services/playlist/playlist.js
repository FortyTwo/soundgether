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
              def.resolve(playlist.tracks);
            });
          })
          .catch(function (err) {
            def.reject(err);
          });
        return def.promise;
      },
      deleteATrack: function (playlist, trackId) {
        var def = $q.defer();
        console.log(trackId);
        $http.put('/api/playlists/' + playlist._id + '/delete-track', { trackId: trackId })
          .then(function () {
            var index = _.findIndex(playlist.tracks, function (item) {
              return item.track.id === trackId;
            });
            console.log(playlist.tracks, index);
            playlist.tracks.splice(index, 1);
            def.resolve();
          })
          .catch(function (err) {
            def.reject(err);
          });
        return def.promise;
      }
    };
  });
