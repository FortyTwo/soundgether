'use strict';

angular.module('soundgether')
  .service('Soundcloud', function (Restangular, soundcloudClientId) {

    var SCRestangular = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://api.soundcloud.com/');
    });

    return {
      search: function (query) {
        return SCRestangular.all('tracks').getList({ q: query, client_id: soundcloudClientId });
      },
      getTrack: function (id) {
        return SCRestangular.one('tracks', id).get({ client_id: soundcloudClientId });
      },
      getArtwork: function (track, size) {
        if (!track) {
          return;
        }
        var artwork = track.artwork_url;
        if (artwork === null) {
          artwork = track.user.avatar_url;
        }
        return size ? artwork.replace('large', size) : artwork;
      },
      getClientId: function () {
        return soundcloudClientId;
      }
    };
  });
