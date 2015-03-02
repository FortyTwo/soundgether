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
        //delete playlist.tracks[0]._id;
        playlist.tracks.push({
          id: trackId
        });
        console.log(playlist.tracks);
        return playlist.put();
      }
    }
  });
