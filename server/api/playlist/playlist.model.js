'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  name: String,
  tracks: [
    { id: Number }
  ]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
