'use strict';

var _ = require('lodash');
var Playlist = require('./playlist.model');
var Moniker = require('moniker');

function handleError(res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of playlists
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Playlist.find(function (err, playlists) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(playlists);
  });
};

/**
 * Get a single Playlist
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) { return handleError(res, err); }
    if (!playlist) { return res.status(404).end(); }
    return res.status(200).json(playlist);
  });
};

/**
 * Creates a new Playlist in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  var names = Moniker.generator([Moniker.adjective, Moniker.noun], {glue: ' '});
  var name = names.choose();
  var newPlaylist = {
    name: _.capitalize(name),
    tracks: [
      req.body.id
    ]
  };
  Playlist.create(newPlaylist, function (err, playlist) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(playlist);
  });
};

/**
 * Updates an existing Playlist in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) { return handleError(res, err); }
    if (!playlist) { return res.status(404).end(); }
    var updated = _.merge(playlist, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(playlist);
    });
  });
};

/**
 * Deletes a Playlist from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) { return handleError(res, err); }
    if (!playlist) { return res.status(404).end(); }
    playlist.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
