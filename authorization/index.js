'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

/** Class for the Authorization and data */
class Authorization {
  /** Authorization
     * @param  {String} Authorization Token
     * @param  {Boolean} Show Details
     * @return {Object} Authorization Object
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
     * Get information about the current Authorization
     * @return {Promise}
     */
  info() {
    let url    = `${config.api_url}/info`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Create a Device
    * @param  {JSON} data
    * @return {Promise}
     */
  createDevice(data) {
    data       = data || {};
    const url    = `${config.api_url}/device`;
    const method = 'POST';
  
    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
}

module.exports = Authorization;
