'use strict';

angular.module('soundgether')
  .filter('prettyTime', function () {
    return function (input) {
      var duration = moment.duration(input),
        ret = '';
      if (duration.hours() > 0) {
        ret += ('0' + duration.hours()).slice(-2) + ':';
      }
      ret += ('0' + duration.minutes()).slice(-2) + ':';
      ret += ('0' + duration.seconds()).slice(-2);
      return ret;
    };
  });
