
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const request         = require('../comum/tago_request.js');

class SDB {
  constructor(token) {
    this.token = token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /**
   * Retrieves a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   */
  getItem(tagoRunURL, key) {
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /**
   * Creates or updates a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   * @param {String} value - value of the parameter.
   */
  setItem(tagoRunURL, key, value) {
    const data   = value;
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * Delete a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   */
  removeItem(tagoRunURL, key) {
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}


module.exports = SDB;
