'use strict';

const conf = require('../conf')
  , mongoose = require('mongoose');

process.env.TZ = 'UTC+0';
process.env.NODE_ENV = 'test';

global.fixtures = require('./fixture');
global.assert = require('chai').assert;
global.ROOT = __dirname;

// Defining this as global to not import in any tests
global.chai = require('chai');
global.chaiHttp = require('chai-http');
global.server = conf.origin;

chai.use(chaiHttp);
global.expect = chai.expect;

// Mocha uses different DB to apply fixtures

describe('project', function () {

  let app = require('../app');

  // Starting server before test
  before(function (done) {
    app.run(function (err) {
      // This one is allows to start server somewhere else and then start test
      if (err && err.code !== 'EADDRINUSE')
        return done(err);
      done();
    });
  });

  // Make sure mongoose is connected
  before(function (done) {
    if (mongoose.connection.readyState === 0) {
      mongoose.Promise = Promise;
      mongoose.connect(conf.mongoUrl, function (err) {
        if (err) {
          console.log(err);
          return;
        }
        done()
      });
    } else {
      done();
    }
  });

  require('./api');

});
