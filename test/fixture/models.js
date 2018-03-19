'use strict';

const fs = require('fs');

let models = function (dirname) {
  return fs.readdirSync(dirname)
    .filter(function (file) {
      return /^[^_].+\.js$/g.test(file);
    })
    .map(function (file) {
      return require(dirname + '/' + file);
    });
};

module.exports = exports = models;

exports.without = function (dirname, modelName) {
  return module.exports(dirname).filter(function (model) {
    return model.modelName !== modelName;
  });
};
