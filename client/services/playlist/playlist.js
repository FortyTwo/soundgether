'use strict';

angular.module('soundgether')
  .service('Playlist', function (Restangular) {

    return {
      get: function (id) {
        return Restangular.one('playlists', id).get();
      },
      create: function (data) {
        return Restangular.all('playlists').post(data);
      },
      addATrack: function (playlist, trackId) {
        playlist.tracks.push({id: trackId});
        console.log(playlist);
        return playlist.put();
      }
    }
  });
