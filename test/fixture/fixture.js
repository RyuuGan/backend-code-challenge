'use strict';

const path = require('path')
  , models = require('./models');

let Fixture = module.exports = function (config) {
  this.root = config.root;
  this.modelRoot = config.modelRoot;
  this.models = models(this.modelRoot);
};

Fixture.prototype.restore = function (id, clean, done) {
  let fixture = this;
  if (typeof clean === 'function') {
    done = clean;
    clean = true;
  }

  require('./restore')(fixture, {
    dump: path.join(this.root, id),
    clean: clean
  }, done);

};
