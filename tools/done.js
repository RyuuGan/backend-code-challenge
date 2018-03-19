'use strict';

/**
 *
 * Function that is used to terminate process after run.
 * If there was no error then process exit code will be 0, otherwise 1.
 *
 * @param {Object} [err] - Was there error before terminating.
 */
module.exports = function done(err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  process.exit(0);
};
