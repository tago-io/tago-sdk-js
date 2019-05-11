'use strict';
const config = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const request = require('../comum/tago_request.js');

class RunUser {
  constructor(token) {
    this.token = token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };
  }

  /** User info
   * @return {Promise}
   */
  info(tagoRunURL) {
    const url = `${config.api_url}/run/${tagoRunURL}/info`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /** Create new TagoIO Run User (Anonymous)
   * @return {Promise}
   */
  static create(tagoRunURL, { name, email, password, timezone, company, newsletter }) {
    const url = `${config.api_url}/run/${tagoRunURL}/signup`;
    const method = 'POST';
    const data = {
      name, email, password, timezone, company, newsletter,
    };

    const headers = default_headers();
    const options = { url, method, headers, data };
    return request(options);
  }

  /** Login at TagoIO Run User (Anonymous)
 * @return {Promise}
 */
  static login(tagoRunURL, { email, password }) {
    const url = `${config.api_url}/run/${tagoRunURL}/login`;
    const method = 'POST';
    const data = {
      email, password,
    };

    const headers = default_headers();
    const options = { url, method, headers, data };
    return request(options);
  }
}


module.exports = RunUser;
