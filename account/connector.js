const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Connector {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Connector
   * @param  {Number} page
   * Page of list starting from 1
   * Default: 1
   * @param  {Array} fields
   * Array of field names
   * Default: ['id', 'name', 'description_short']
   * Example: ['id', 'name', 'public']
   *
   * Values allowed:
   * id, name, description_short, description_full, description_end, public,
   * account, logo_url, options, created_at, updated_at, categories.
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
   * Array of Connector in alphabetically order.
  */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    const url    = `${config.api_url}/connector`;
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

  /** Get Info of the Connector
  * @param  {String} connector_id id
  * @param  {boolean} no_parent dont subscribe parameters with parent parameters
  * @return {Promise}
  */
  info(connector_id, no_parent = false) {
    if (!connector_id || connector_id === '') {
    // If ID is send with null, it will get List instead info.
      return new Promise((resolve, reject) => reject('Connector ID parameter is obrigatory.'));
    }
    const url    = `${config.api_url}/connector/${connector_id}`;
    const method = 'GET';
    const params = {
      no_parent,
    };

    const options = { ...this.default_options, url, method, params };
    return request(options);
  }

  /** Create a Connector
  * @param  {object} data
  * @param  {string} data.name - Name of the connector
  * @param  {string} data.description_short - short description of the connector
  * @param  {string} data.description_full - full description of the connector
  * @param  {string} data.description_end - end description of the connector
  * @param  {string} data.logo_url - public image url to use as logo
  * @param  {Object} data.options - connector configurations
  * @return {Promise}
  */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/connector`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Edit the Connector
  * @param  {String} connector id
  * @param  {object} data
  * @param  {string} data.name - Name of the connector
  * @param  {string} data.description_short - short description of the connector
  * @param  {string} data.description_full - full description of the connector
  * @param  {string} data.description_end - end description of the connector
  * @param  {string} data.logo_url - public image url to use as logo
  * @param  {Object} data.options - connector configurations
  * @return {Promise}
  */
  edit(connector_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/connector/${connector_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete the Connector
  * @param  {String} connector id
  * @return {Promise}
  */
  delete(connector_id) {
    const url    = `${config.api_url}/connector/${connector_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** List Devices Tokens
   * @param {String} connector_id Connector ID
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
  tokenList(connector_id, page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'created_at'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/connector/token/${connector_id}`;
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

  /** Create Token for the Device
    * @param  {String} device id
    * @param  {Object} data {name}
    * @return {Promise}
     */
  tokenCreate(connector_id, data) {
    data           = data || {};
    data.connector = connector_id;

    const url    = `${config.api_url}/connector/token`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete Token from the Device
    * @param  {String} token id
    * @return {Promise}
     */
  tokenDelete(token) {
    const url    = `${config.api_url}/connector/token/${token}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Connector;
