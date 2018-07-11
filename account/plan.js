'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const paramsSerializer = require('../comum/paramsSerializer');

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
  * @argument {String} data.plan the id of the plan to be activated
  * @return {Promise}
  */
  activate(data) {
    data         = data || {};
    const url    = `${config.api_url}/account/plan`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
  
  /** Activate a plan
  * @param  {JSON} services
  * @argument {String} data.plan the id of the plan
  * @argument {Number} data.sms the amount of sms
  * @argument {Number} data.analysis the amount analysis
  * @argument {Number} data.device_request the amount device_request
  * @argument {Number} data.data_records the amount data_records
  * @argument {Number} data.data_backedup the amount data_backedup
  * @argument {Number} data.email the amount email
  * @return {Promise}
  */
  getCurrentValue(services) {
    const url    = `${config.api_url}/account/plan_value`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: services,
    });
    return request(options);
  }

  /** Activate a plan
  * @return {Promise}
  */
  getActivePlan() {
    const url    = `${config.api_url}/account/plan`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
    });
    return request(options);
  }
}

module.exports = Plan;
