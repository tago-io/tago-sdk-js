'use strict';
const request = require('../comum/tago_request.js');
const default_headers = require('../comum/default_headers.js');

class Currency {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };
  }

  /**
     * Convert between two coins
     * @param  {STRING} c_from  To convert from
     * @param  {STRING} c_to    To convert to
     * @return {Promise}
     */
  convert(c_from, c_to) {
    return new Promise((resolve, reject) => {

      if (!c_from || !c_to) {
        return reject('Missing params');
      }

      if (Array.isArray(c_to)) {
        c_to = c_to.join(',');
      }

      let url = 'http://apilayer.net/api/live';
      let method = 'get';
      let params = {
        access_key: this.key,
        source: c_from,
        currencies: c_to,
        format: 1
      };

      let options = Object.assign({}, this.default_options, {
        url,
        method,
        params
      });
      request(options).then((result) => {
        if (!result.success) {
          return reject('Currency not found.');
        }

        let result_return = {
          'from': result.source,
          'result': result.quotes
        };

        return resolve(result_return);
      }).catch(reject);
    });
  }
}

module.exports = Currency;