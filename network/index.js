
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

/** Class for the Network and data */
class Network {

  /** Network
     * @param  {String} token - Token of the network
     * @param  {Boolean} details - Show Details
     * @return {Object} Network Object
     */
  constructor(token, details) {
    this.token   = token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };

    if (details) {
      this.default_options.qs = { details: true };
    }
  }

  /** Info
     * Get information about the current network.
     * @return {Promise}
     */
  info() {
    const url    = `${config.api_url}/info`;
    const method = 'GET';

    const options = { ...this.default_options, url, method, params };
    return request(options);
  }

  resolveToken(serie_number, authorization) {
    let url    = `${config.api_url}/integration/network/resolve/${serie_number}`;
    const method = 'GET';

    if (authorization) url = `${url}/${authorization}`;

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Network;
