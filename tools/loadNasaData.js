'use strict';

const { NasaApi } = require('./nasaApi')
  , Neo = require('../model/nearEarthObject')
  , moment = require('moment')
  , mongoose = require('mongoose')
  , conf = require('../conf')
  , done = require('./done');

/**
 * This script load data from api.nasa.gov about Near-Earth Objects (NEOs) from last 3 days.
 * And saves data to DB
 *
 */
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
};

(async function run() {

  await mongoose.connect(conf.mongoUrl)
    .catch((err) => {
      console.log('Unable to connect to mongodb');
      done(err);
    });

  const api = new NasaApi();

  const data = await api.get('/neo/rest/v1/feed', {
    start_date: moment().endOf('day').add(-3, 'days').format('YYYY-MM-DD'),
    end_date: moment().endOf('day').format('YYYY-MM-DD')
  });

  const neos = data.near_earth_objects;
  let dates = Object.keys(neos);
  let newObjects = 0;
  let existingObjects = 0;

  await asyncForEach(dates, async (date) => {

    await asyncForEach(neos[date], async function (neo) {
      let existing = await Neo.findOne({
        reference: neo.neo_reference_id
      });
      // No need to save, we already have one
      if (existing) {
        existingObjects += 1;
        return;
      }

      let approachData = neo.close_approach_data[0];
      let speed = approachData && approachData.relative_velocity && approachData.relative_velocity.kilometers_per_hour || 0;

      let newNeo = new Neo({
        date: moment.utc(date).endOf('day').toDate(),
        reference: neo.neo_reference_id,
        name: neo.name,
        speed: speed,
        isHazardous: neo.is_potentially_hazardous_asteroid
      });
      newObjects += 1;
      await newNeo.save();
    });
  }).catch(done);
  console.log(`Processed: ${newObjects} new objects, ${existingObjects} existing objects. Total objects got from NASA: ${data.element_count}`);
  done();

})();
