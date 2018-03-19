'use strict';

const conf = require('../conf')
  , request = require('request-promise-native');

class NasaApi {

  constructor() {
    this.apiToken = conf.nasaApiKey;
    this.baseUrl = 'https://api.nasa.gov';
  }

  async get(url, query) {
    url = url.replace(/^\//, '');
    if (!query.api_key) {
      query.api_key = this.apiToken;
    }
    const options = {
      method: 'GET',
      uri: `${this.baseUrl}/${url}`,
      qs: query,
      json: true
    };
    return await request(options);
  }

}

module.exports.NasaApi = NasaApi;
