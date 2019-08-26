
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Console {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  log(message, timestamp) {
    if (!timestamp) timestamp = new Date().getTime();
    const url    = `${config.api_url}/analysis/services/console/send`;
    const method = 'post';
    const data = { message, timestamp };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = Console;
