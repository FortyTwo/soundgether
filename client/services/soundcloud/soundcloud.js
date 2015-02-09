'use strict';

angular.module('soundgether')
  .service('Soundcloud', function (Restangular) {

    var clientId = 'ce442c9ae9f8ef31ed36d65d5c089a1b';

    var SCRestangular = Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl('http://api.soundcloud.com/');
    });

    return {
      search: function (query) {
        return SCRestangular.all('tracks').getList({q: query, limit: 5, client_id: clientId});
      },
      getTrack: function (id) {
        return SCRestangular.one('tracks', id).get({client_id: clientId});
      },
      getArtwork: function (track, size) {
        if (!track)
          return;
        var artwork = track.artwork_url;
        if (artwork === null) {
          artwork = track.user.avatar_url;
        }
        return (artwork.replace('large', size));
      },
      getDuration: function (input) {
        var duration = moment.duration(input),
          ret = "";
        if (duration.hours() > 0) {
          ret += ('0' + duration.hours()).slice(-2) + ":";
        }
        if (duration.minutes() > 0) {
          ret += ('0' + duration.minutes()).slice(-2) + ":";
        }
        ret += ('0' + duration.seconds()).slice(-2);
        return ret;
      }
    }
  });
