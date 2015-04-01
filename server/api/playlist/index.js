'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./playlist.controller');

router.get('/', controller.index);
router.get('/:id', controller.show);

router.post('/', controller.create);

router.put('/:id', controller.update);
router.put('/:id/add-track', controller.addTrack);

router.delete('/:id', controller.destroy);

module.exports = router;
