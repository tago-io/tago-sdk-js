'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class PaymentMethods {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** Create a Payment method
  * @param  {JSON} data
  * @argument {*String} data.name
  * @argument {*String} data.token
  * @argument {*Boolean} data.default_card
  * @return {Promise}
  */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/payment_method`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Get all the payment methods for the account
    * @return {Promise} Array of payment methods
    */
  list() {
    let url    = `${config.api_url}/account/payment_method`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /**
   * Set the default payment method.
   * @param {*JSON} data 
   * @argument {*String} data.id
   * @return {Promise}
   */
  setDefaultPaymentMethod(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/payment_method`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    console.log(url);
    return request(options);
  }

  /**
   * Set the default payment method.
   * @param {*JSON} data 
   * @argument {*String} data.id
   * @return {Promise}
   */
  deletePaymentMethod(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/payment_method`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
}



module.exports = PaymentMethods;
