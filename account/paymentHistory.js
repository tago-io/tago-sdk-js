'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class PaymentHistory {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }
  
  /** Get the payment History of the current account
  * @return {Promise}
  */
  getHistory() {
    const url    = `${config.api_url}/account/payment_history`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }
}

module.exports = PaymentHistory;