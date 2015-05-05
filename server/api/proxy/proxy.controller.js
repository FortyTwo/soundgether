'use strict';

var request = require('request');
var config = require('../../config/environment');

/**
 * Get MP3 of a track
 *
 * @param req
 * @param res
 */
exports.url = function (req, res) {
  var location = req.params.id;
  request('https://api.soundcloud.com/tracks/' + location + '/stream?client_id=' + config.clientId).pipe(res);
};
