'use strict';

const async = require('async')
  , fs = require('fs-extra')
  , path = require('path')
  , debug = require('debug')('fixture:debug');

module.exports = function (fixture, opts, done) {
  let dumpDir = opts.dump;
  let queries = [];
  // Cleanup previous data, if asked to
  if (opts.clean) {
    queries.push(function (cb) {
      async.eachSeries(fixture.models, function (Model, cb) {
        Model.remove({}, cb);
      }, cb);
    });
  }
  // Read and persist models
  fixture.models.forEach(function (Model) {
    queries.push(function (cb) {
      let file = path.join(dumpDir, Model.modelName + '.json');
      fs.readJson(file, 'utf-8', function (ignoredErr, objs) {
        if (!objs) return cb(); // Ignore missing files
        debug('Restoring from %s', file);
        if (Array.isArray(objs))
          async.each(objs, function (obj, cb) {
            new Model(obj).save(cb);
          }, cb);
        else
          new Model(objs).save(cb);
      });
    });
  });
  // All done
  async.series(queries, done);
};

