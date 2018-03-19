'use strict';

const $ = require('./index')
  , Neo = require('../model/nearEarthObject')
  , wrap = require('express-async-wrap');

const PREFIX = '/neo';

/**
 * Returns all DB entries which contain potentially hazardous asteroids
 */
$.get(PREFIX + '/hazardous', wrap(async function (req, res) {
  // It should be applied some sorting, like by name or date
  let neos = await Neo.find({
    isHazardous: true
  });

  // This operation can be made by writing a plugin, that uses cursor of mongodb and on data return client version
  res.apiSuccess(neos.map(n => n.client));
}));


/**
 * @param {'true'|'false'} hazardous - is potentially hazardous asteroid
 *
 * @returns {Object|null} neo - fastest asteroid
 */
$.get(PREFIX + '/fastest', wrap(async function (req, res) {
  // What should happen if hazardous param is not `true` of `false`?
  // Right now it is false if the param is not set to `true`.
  // Also other routes have the same question
  let isHazardous = req.query.hazardous === 'true';
  let neo = await Neo.findOne({
    isHazardous
  }).sort({
    speed: -1
  });

  if (!neo) {
    return res.apiSuccess(null);
  }

  return res.apiSuccess(neo.client)
}));

/**
 * @param {'true'|'false'} hazardous - is potentially hazardous asteroid
 *
 * @returns {Number|null} year - year with most asteroids
 */
$.get(PREFIX + '/best-year', wrap(async function (req, res) {
  let isHazardous = req.query.hazardous === 'true';
  let bestYear = await Neo.getBestYear(isHazardous);
  return res.apiSuccess(bestYear);
}));

/**
 * @param {'true'|'false'} hazardous - is potentially hazardous asteroid
 *
 * @returns {Number|null} month - month with most asteroids
 */
$.get(PREFIX + '/best-month', wrap(async function (req, res) {
  let isHazardous = req.query.hazardous === 'true';
  let bestYear = await Neo.getBestMonth(isHazardous);
  return res.apiSuccess(bestYear);
}));
