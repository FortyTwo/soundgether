'use strict';

var Playlist = require('./playlist.model');

exports.register = function (socket) {

  Playlist.schema.post('save', function (doc) {
    socket.emit('Playlist:save', doc);
  });

  Playlist.schema.post('remove', function (doc) {
    socket.emit('Playlist:remove', doc);
  });

}
