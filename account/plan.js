
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const paramsSerializer = require('../comum/paramsSerializer');

class Plan {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /**
   * Active plan and set services limit
   * @param {JSON} data
   * @return {Promise<Boolean>}
   * @example data
    {
      "plan": "59f77e5e647ee71b901d9885",
      "sms": 100,
      "email": 1000,
      "data_records": 200000,
      "device_request": 250,
      "analysis": 1000
    }
   */
  setPlanParameters(data) {
    data         = data || {};
    const url    = `${config.api_url}/account/plan`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * Sets the support plan parameters.
   */
  setSupportPlanParameters(data) {
    data         = data || {};
    const url    = `${config.api_url}/account/plan_support`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * Get price to update to new plan
   * @param {JSON} data
   * @example data
    {
      "plan": "59f77e5e647ee71b901d9885",
      "sms": 100,
      "email": 1000,
      "data_records": 200000,
      "device_request": 250,
      "analysis": 1000
    }
   */
  getPriceToUpdate(data) {
    const url    = `${config.api_url}/account/plan_value`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: data };
    return request(options);
  }

  /**
   * Get Active Plan and Services
   * @return {Promise<JSON>}
   * @example Return
    {
      "plan": "59f77e5e647ee71b901d9887",
      "plan_next": "59f77e5e647ee71b901d9887",
      "analysis": 10,
      "data_backedup": 5,
      "data_records": 21083,
      "device_request": 1000,
      "email": 10,
      "middleware_request": 10,
      "mqtt_publish": 10,
      "mqtt_subscribe": 10,
      "sms": 10
    }
   */
  getActivePlan() {
    const url    = `${config.api_url}/account/plan`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer };
    return request(options);
  }

  /**
   * Get Active Support Plan.
   */
  getActiveSupportPlan() {
    const url    = `${config.api_url}/account/plan_support`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer };
    return request(options);
  }

  /**
   * Get current Tago pricing
   * @return {Promise<JSON>}
   */
  getCurrentPrices() {
    const url = `${config.api_url}/pricing`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer };
    return request(options);
  }

  /**
   * Shows a summary of how much your account is costing, divided by sections.
   */
  summary() {
    const url    = `${config.api_url}/billing`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Plan;
