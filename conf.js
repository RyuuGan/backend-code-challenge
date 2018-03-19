'use strict';

const path = require('path');

class Conf {

  constructor() {
    this.root = process.cwd();
  }

  get port() {
    return process.env.PORT || 3001;
  }

  get workers() {
    return process.env.WORKERS || 1;
  }

  get host() {
    return process.env.HOST || '127.0.0.1:3001';
  }

  get secured() {
    return process.env.SECURED === 'true';
  }

  get origin() {
    return this.secured ? `https://${this.host}` : `http://${this.host}`;
  }

  get mongoUrl() {
    return process.env.MONGODB_URI || 'mongodb://127.0.0.1/mcmakler';
  }

  path(relPath) {
    return path.join(this.root, relPath);
  }

  get nasaApiKey() {
    return process.env.NASA_API_KEY || 'N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD';
  }

}

module.exports = new Conf();
