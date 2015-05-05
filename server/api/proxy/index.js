'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./proxy.controller');

router.get('/:id', controller.url);

module.exports = router;
