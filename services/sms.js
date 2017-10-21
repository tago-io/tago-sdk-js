'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class SMS {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /**
     * Send SMS to number
     * @param  {STRING} to      Number to send SMS, Example: +554498774411
     * @param  {STRING} message Message to be send
     * @return {Promise}
     */
  send(to, message) {
    let url    = `${config.api_url}/analysis/services/sms/send`;
    let method = 'post';
    let data = { to, message};

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }


}

module.exports = SMS;
