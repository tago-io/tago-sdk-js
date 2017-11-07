'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Plan {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** Activate a plan
  * @param  {JSON} data
  * @argument {*String} data.plan the id of the plan to be activated
  * @return {Promise}
  */
  activate(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/plan`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
}

module.exports = Plan;