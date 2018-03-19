'use strict';

const express = require('express');

const router = module.exports = new express.Router();

router.use(require('body-parser').json());

router.use(require('./middleware/responseExt'));

router.get('/', function (req, res) {
  return res.json({
    hello: 'world'
  });
});

// This use statement can check some stuff that help analyze is this api is available for someone or not.
// Like checking header with API key, log api request statistics or other...
router.use('*', function (req, res, next) {
  next();
});

// Surely it should be done with version, otherwise it will be hard maintainable,
// Like /v1/neo, instead of just neo.
require('./neo');

// Route that matches all routes and send error, so other routes will not passed
// If we are using different version of api
// Not sure if this one should exist or not. It depends. But I have added some
router.use('*', function (req, res) {
  return res.apiFailed('ROUTE_NOT_FOUND', 'Not API route found.');
});

// This should check for errors if something happens, so api should not throw anything like MongoDB timeout,
// or MongoDB validation failed via mongoose library
// So it will be here for a while
router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({
    error: 'Something broke!'
  });
});
