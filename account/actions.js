const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Actions {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Action
     * @param  {Number} page
     * Page of list starting from 1
     * Default: 1
     * @param  {Array} fields
     * Array of field names
     * Default: ['id', 'name']
     * Example: ['id', 'name', 'lock']
     *
     * Values allowed:
     * id, name, description, active, lock, last_run, action,
     * account, tags, created_at, updated_at.
     * @param  {JSON} filter
     * JSON of filter
     * Without default
     * Example: {name: 'Motor'}
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
     * Array of action in alphabetically order.
    */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    if (!arguments.length) return this._list(); // @deprecated
    const url    = `${config.api_url}/action`;
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

  /**
     * It return old api style
     * @deprecated
     */
  _list() {
    const parameters = [
      1,
      ['action', 'active', 'created_at', 'id', 'last_run', 'lock', 'name', 'tags'],
      {},
      1000,
      'name',
    ];
    return this.list.call(this, ...parameters);
  }

  /** Create a Action
    * @param  {JSON} data
    * @return {Promise}
     */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/action`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Edit the Action
    * @param  {String} action id
    * @param  {Object} data
    * @return {Promise}
     */
  edit(action_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/action/${action_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete the Action
    * @param  {String} action id
    * @return {Promise}
     */
  delete(action_id) {
    const url    = `${config.api_url}/action/${action_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Get Info of the Action
    * @param  {String} action id
    * @return {Promise}
     */
  info(action_id) {
    if (!action_id || action_id === '') {
      // If ID is send with null, it will get List instead info.
      return Promise.reject('Action ID parameter is obrigatory.');
    }
    const url    = `${config.api_url}/action/${action_id}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Actions;
