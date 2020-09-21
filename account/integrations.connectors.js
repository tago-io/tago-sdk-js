const request          = require('tago/comum/tago_request');
const paramsSerializer = require('tago/comum/paramsSerializer');
const config           = require('tago/config');
const default_headers  = require('tago/comum/default_headers');

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
   * id, name, description, description_full, logo_url, icon_url,
   * device_parameters, networks, payload_encoder, payload_decoder,
   * public, device_annotation, created_at, updated_at
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
    const url    = `${config.api_url}/integration/connector`;
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
  * @return {Promise}
  */
  info(connector_id, fields = ['id', 'name']) {
    if (!connector_id || connector_id === '') {
      return Promise.reject('Connector ID parameter is obrigatory.');
    }

    const url    = `${config.api_url}/integration/connector/${connector_id}`;
    const method = 'GET';
    const params = {
      fields,
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
    const url    = `${config.api_url}/integration/connector`;
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
    const url    = `${config.api_url}/integration/connector/${connector_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = Connector;
