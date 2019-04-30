'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const batchRequest    = require('../comum/batchRequest.js');

/** Class for the device and data */
class Device {
  /** Device
     * @param  {String} Device Token
     * @param  {Boolean} Show Details
     * @return {Object} Device Object
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
     * Get information about the current device
     * @return {Promise}
     */
  info() {
    let url    = `${config.api_url}/info`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Insert
     * @param  {Object|Array} data
     * @return {Promise}
     */
  insert(data) {
    data       = data || {};
    let url    = `${config.api_url}/data`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Find
     * @class
     * @param  {JSON} query object
     * @return {Promise}
     */
  find(query_obj) {
    query_obj  = query_obj || {};
    let url    = `${config.api_url}/data`;
    let method = 'GET';
    let params = Object.assign({}, this.default_options.qs || {}, query_obj);

    let options = Object.assign({}, this.default_options, {url, method, params});

    return request(options);
  }

  /** remove
   * @deprecated
   * @param  {string} variable_or_id
   * @param  {number} [qty] default is 1
   * @return {Promise}
   */
  removeDeprecated(variable_or_id, qty) {
    let url    = `${config.api_url}/data`;
    if (variable_or_id) {
      url += `/${variable_or_id}`;
    }

    let params = Object.assign({}, this.default_options.qs || {}, qty ? {qty} : {});
    let method = 'DELETE';

    let options = Object.assign({}, this.default_options, {url, method, params});

    return request(options);
  }

  /** Remove items
   * @param  {JSON} queryToDelete
   * You can use the same JSON query from .find to delete items
   * @return {Promise} Promise - The string message from server
   */
  remove(...args) {
    let [ queryOrID, qty ] = args;
    if (typeof queryOrID !== 'object' || qty === 'all') {
      console.warn('The remove method using variable or ID is deprecated, it should have a JSON as a parameter, see our documentation for more information');
      return this.removeDeprecated(...args);
    }

    if (args.length === 0) {
      queryOrID = {
        query: 'last_item',
      };
    }

    const query_obj = queryOrID || {};
    const url = `${config.api_url}/data`;
    const method = 'DELETE';
    const params = Object.assign({}, this.default_options.qs || {}, query_obj);

    const options = Object.assign({}, this.default_options, { url, method, params });

    return request(options);
  }

  /** Get Parameters
     * @return {Promise}
     */
  getParams(sent_status) {
    let url     = `${config.api_url}/device/params`;
    let method  = 'GET';
    let params  = {
      sent_status
    };
    let options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Mark Parameters as sent
     * @param  {String} param_id Id of the parameter
     * @return {Promise}
     */
  markParam(param_id) {
    let url     = `${config.api_url}/device/params/${param_id}`;
    let method  = 'PUT';
    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /**
   * Send a batch commands
   * @param {Array<JSON>} batchData
   * @param {Boolean} async
   * Async=true method send all commands in same time,
   * Async=false send command one by one, and stop if got a error
   * Examples:
   * [
   *   {"method": "GET", "endpoint": "/data", "headers": {"token": "38935657-8491-4702-b951-a03374410db0"} },
   *   {"method": "GET", "endpoint": "/device" }
   * ]
   */
  batch(batchData, async = false) {
    return batchRequest.call(this, batchData, async);
  }
}

module.exports = Device;
