'use strict';

const Fixture = require('./fixture')
  , conf = require('../../conf');

module.exports = new Fixture({
  root: conf.path('test/fixture'),
  modelRoot: conf.path('model')
});
