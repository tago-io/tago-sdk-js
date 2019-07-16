'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

/** Class for the Connector and data */
class Connector {
  /** Connector
     * @param  {String} Connector Token
     * @param  {Boolean} Show Details
     * @return {Object} Connector Object
     */
  constructor(token, details) {
    this.token   = token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };

    if (details) {
      this.default_options.qs = {'details': true};
    }
  }

  /** Info
     * Get information about the current connector
     * @return {Promise}
     */
  info() {
    let url    = `${config.api_url}/info`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  resolveToken(serie_number, authorization) {
    let url    = `${config.api_url}/connector/resolve/${serie_number}`;
    let method = 'GET';

    if (authorization) url = `${url}/${authorization}`;

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }
}

module.exports = Connector;
