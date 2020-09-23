const request          = require('tago/comum/tago_request');
const paramsSerializer = require('tago/comum/paramsSerializer');
const config           = require('tago/config');
const default_headers  = require('tago/comum/default_headers');

class Network {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Network
   * @param  {Number} page
   * Page of list starting from 1
   * Default: 1
   * @param  {Array} fields
   * Array of field names
   * Default: ['id', 'name', 'description_short']
   * Example: ['id', 'name', 'public']
   *
   * Values allowed:
   * id, name, description, description_full, logo_url, icon_url, banner_url,
   * device_parameters, middleware_ednpoint, payload_encoder, payload_decoder,
   * public, documentation_url, serial_nubmer, verification_code.
   *
   * @param  {JSON} filter
   * JSON of filter
   * Without default
   * Example: {name: 'Motor', categories: ['Sigfox']}
   * Values allowed: same of fields parameter.
   *
   * TIP: On name you can use * (asterisk) as wildcard.
   * @param {Number} amount
   * Amount of items will return
   * Default is 20
   * @param {String} orderBy
   * Order by a field
   * Examples:
   *  'name,asc'
   *  'name,desc'
   *  'name' [default: asc]
   * @return {Promise}
   * Array of Network in alphabetically order.
  */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    const url    = `${config.api_url}/integration/network`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        fields,
        amount,
        orderBy,
      } };
    return request(options);
  }

  /** Get Info of the Network
  * @param  {String} network_id id
  * @return {Promise}
  */
  info(network_id, fields = ['id', 'name']) {
    if (!network_id || network_id === '') {
      return Promise.reject('Network ID parameter is obrigatory.');
    }

    const url    = `${config.api_url}/integration/network/${network_id}`;
    const method = 'GET';
    const params = {
      fields,
    };

    const options = { ...this.default_options, url, method, params };
    return request(options);
  }

  /** Create a Network
  * @param  {object} data
  * @param  {string} data.name - Name of the network
  * @param  {string} data.description_short - short description of the network
  * @param  {string} data.description_full - full description of the network
  * @param  {string} data.description_end - end description of the network
  * @param  {string} data.logo_url - public image url to use as logo
  * @param  {Object} data.options - network configurations
  * @return {Promise}
  */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/integration/network`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Edit the Network
  * @param  {String} network id
  * @param  {object} data
  * @param  {string} data.name - Name of the network
  * @param  {string} data.description_short - short description of the network
  * @param  {string} data.description_full - full description of the network
  * @param  {string} data.description_end - end description of the network
  * @param  {string} data.logo_url - public image url to use as logo
  * @param  {Object} data.options - network configurations
  * @return {Promise}
  */
  edit(network_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/integration/network/${network_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete the Network
    * @param  {String} network id
    * @return {Promise}
     */
  delete(network_id) {
    const url    = `${config.api_url}/integration/network/${network_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** List Networks Tokens
   * @param {String} network_id Network ID
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
    * name, type, permission, token, expire_time,
    * serie_number, verification_code, created_at
    * @param {String} orderBy
    * Order by a field
    * Examples:
    *  'name,asc'
    *  'name,desc'
    *  'created_at' [default: desc]
    * @return {Promise}
    * Array of tokens in created_at order.
  */
  tokenList(network_id, page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'permission'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/integration/network/token/${network_id}`;
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

  /** Create Token for the Network
    * @param  {String} network id
    * @param  {Object} data {permission, expire_time_select, name, expire_time}
    * @return {Promise}
     */
  tokenCreate(network_id, data) {
    data       = data || {};
    data.network = network_id;

    const url    = `${config.api_url}/integration/network/token`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete Token from the Network
    * @param  {String} token token of network
    * @return {Promise}
     */
  tokenDelete(token) {
    const url    = `${config.api_url}/integration/network/token/${token}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Network;
