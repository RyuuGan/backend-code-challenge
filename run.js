'use strict';

const cluster = require('cluster')
  , mongoose = require('mongoose')
  , conf = require('./conf');

process.env.TZ = 'UTC+0';
mongoose.Promise = Promise;

if (cluster.isMaster) {

  for (let i = 0; i < conf.workers; i++)
    cluster.fork();

  cluster.on('exit', function (worker) {
    if (!worker.exitedAfterDisconnect)
      cluster.fork();
  });

} else {

  require('./app').run();

}
