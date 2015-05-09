'use strict';

angular.module('soundgether')
  .animation('.fancy-slide', function () {
    return {
      enter: function (element, done) {
        var t = new TimelineMax();
        t
          .set(element, { opacity: 0, y: -30 })
          .to(element, 0.25, { opacity: 1, y: 0 })
          .addCallback(done);
      },

      leave: function (element, done) {
        var t = new TimelineMax();
        t
          .to(element, 0.25, { opacity: 0 })
          .to(element, 0.25, { height: 0, margin: 0, padding: 0 })
          .addCallback(done);
      },

      move: function (element, done) {

        // animate move

        return function (isCancelled) {
          if (isCancelled) {
          }
        };
      }

    };
  });
