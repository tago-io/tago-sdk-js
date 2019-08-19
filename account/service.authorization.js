
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class ServiceAuth {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Authorization Tokens
   * @param  {Number} page
   * Page of list starting from 1
   * Default: 1
   * @param {Number} amount
   * Amount of items will return
   * Default is 20
   * @param  {JSON} filter
   * JSON of filter
   * Without default
   * Example: {name: 'Motor'}
   * Values allowed: same of fields parameter.
   *
   * TIP: On name you can use * (asterisk) as wildcard.
  * @param  {Array} fields
    * Array of field names
    * Default: ['name']
    * Example: ['name', 'token']
    *
    * Values allowed:
    * name, type, token, created_at
    * @param {String} orderBy
    * Order by a field
    * Examples:
    *  'name,asc'
    *  'name,desc'
    *  'created_at' [default: desc]
    * @return {Promise}
    * Array of tokens in created_at order.
  */
  tokenList(page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'created_at'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/serviceauth`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        amount,
        orderBy,
        fields,
      } };
    return request(options);
  }

  /** Create Token for the Authorization Service
    * @param  {Object} data {name}
    * @return {Promise}
     */
  tokenCreate(data) {
    data = data || {};

    const url    = `${config.api_url}/serviceauth`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete Token from the Authorization Service
    * @param  {String} token id
    * @return {Promise}
     */
  tokenDelete(token) {
    const url    = `${config.api_url}/serviceauth/${token}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Edit Token from the Authorization Service
    * @param  {String} token id
    * @param  {String} verification_code optional parameter
    * @return {Promise}
     */
  tokenEdit(token, verification_code) {
    const url    = `${config.api_url}/serviceauth/${token}`;
    const method = 'PUT';
    const data = { verification_code };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = ServiceAuth;
