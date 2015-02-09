'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
  name: String,
  tracks: [
    { id: String }
  ]
});

module.exports = mongoose.model('Playlist', PlaylistSchema);
