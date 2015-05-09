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
          .then(function (res) {
            var mongoId = res.data._id;
            Soundcloud.getTrack(trackId).then(function (res) {
              var newTrack = {
                _id: mongoId,
                id: trackId,
                track: res,
                audio: ngAudio.load(res.stream_url + '?client_id=' + Soundcloud.getClientId())
                };
                playlist.tracks.push(newTrack);
              def.resolve(newTrack);
            });
          })
          .catch(function (err) {
            def.reject(err);
          });
        return def.promise;
      },
      deleteATrack: function (playlist, mongoId) {
        var def = $q.defer();
        $http.delete('/api/playlists/' + playlist._id + '/track', { mongoId: mongoId })
          .then(function () {
            var index = _.findIndex(playlist.tracks, function (item) {
              return item._id === mongoId;
            });
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
