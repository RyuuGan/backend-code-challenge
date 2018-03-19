'use strict';

const mongoose = require('mongoose');

// This is used for storing data in MongoDB
let NearEarthObject = mongoose.Schema({

  date: {
    type: Date,
    required: true
  },

  // neo_reference_id
  reference: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  // km/h
  speed: {
    type: Number,
    required: true
  },

  // Is this one is potentially hazardous
  // is_potentially_hazardous_asteroid
  isHazardous: {
    type: Boolean,
    required: true
  }

});

/**
 * Client version of what client should see. Because there can be much more data for server needs,
 * but client don't need to know about it.
 *
 * For now it returns all the fields, but maybe later it may change. So we need to change one place.
 */
NearEarthObject.virtual('client').get(function () {
  return {
    _id: this._id,
    date: this.date,
    reference: this.reference,
    name: this.name,
    speed: this.speed,
    isHazardous: this.isHazardous
  };
});

/**
 * Find the best year - year with most asteroids
 * @param {Boolean} isHazardous - boolean for search best year for hazardous or not
 * @returns {Promise<Number|null>} - Number if any asteroids found, or null if not.
 */
NearEarthObject.statics.getBestYear = async function (isHazardous) {
  let Model = this;

  // what should be returned if there are several years with same amount of asteroids?
  // So there are several best years
  // Currently I return the first one after sort happens, so mongodb decides the order, which is not so correct
  return await Model.getBest(isHazardous, { year: { $year: "$date" } }, r => r._id.year);
};

/**
 * Find the best month - month with most asteroids (not month of the year)
 * @param {Boolean} isHazardous - boolean for search best year for hazardous or not
 * @returns {Promise<Number|null>} - Number if any asteroids found, or null if not. The number between 1 and 12.
 */
NearEarthObject.statics.getBestMonth = async function (isHazardous) {
  let Model = this;

  // what should be returned if there are several month with same amount of asteroids?
  // So there are several best months
  // Currently I return the first one after sort happens, so mongodb decides the order, which is not so correct
  return await Model.getBest(isHazardous, { month: { $month: "$date" } }, r => r._id.month);
};

/**
 * Helper function to search best by year or month, depending on id field and mapping function
 * @param {Boolean} isHazardous
 * @param {Object} idField - id field for grouping
 * @param {Function} mapping - mapping function to get the result
 * @returns {Promise<Number|null>} result of the mapping function or null if nothing found
 */
NearEarthObject.statics.getBest = async function (isHazardous, idField, mapping) {
  let Model = this;

  let pipeline = [];

  pipeline.push({
    $match: {
      isHazardous
    }
  });

  pipeline.push({
    $project: { date: 1 }
  });

  pipeline.push({
    $group: {
      _id: idField,
      count: { $sum: 1 }
    }
  });

  pipeline.push({
    $sort: {
      count: -1
    }
  });

  let results = await Model.aggregate(pipeline);

  if (!results || results.length === 0) {
    return null;
  }

  return mapping(results[0]);
};

// Add some indexes to improve search performance
NearEarthObject.index({ isHazardous: 1, speed: -1 });
NearEarthObject.index({ date: 1 });

module.exports = exports = mongoose.model('NearEarthObject', NearEarthObject);
