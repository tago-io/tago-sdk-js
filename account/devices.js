'use strict';
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Devices {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** List Devices
     * @param  {Number} page
     * Page of list starting from 1
     * Default: 1
     * @param  {Array} fields
     * Array of field names
     * Default: ['id', 'name']
     * Example: ['id', 'name', 'visible']
     *
     * Values allowed:
     * id, name, description, visible, active, bucket,
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
     * @param {Boolean} resolveBucketName
     * It add a field called 'bucket_name'
     * with bucket name
     * @return {Promise}
     * Array of devices in alphabetically order.
    */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc', resolveBucketName = false) {
    if (!arguments.length) return this._list(); // @deprecated
    const url    = `${config.api_url}/device`;
    const method = 'GET';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        fields,
        amount,
        orderBy,
        resolveBucketName,
      },
    });
    return request(options);
  }

  /**
     * It return old api style
     * @deprecated
     */
  _list() {
    const parameters = [
      1,
      ['active', 'bucket', 'created_at', 'id', 'name', 'tags', 'visible'],
      {},
      1000,
      'name',
      true
    ];
    return this.list.call(this, ...parameters).then(result => {
      return result.map(item => {
        item.bucket = {
          id: item.bucket,
          name: item.bucket_name,
        };
        delete item.bucket_name;
        return item;
      });
    });
  }

  /** Create a Device
    * @param  {JSON} data
    * @return {Promise}
     */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/device`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Edit the Device
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
  edit(device_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/device/${device_id}`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete the Device
    * @param  {String} device id
    * @return {Promise}
     */
  delete(device_id) {
    const url    = `${config.api_url}/device/${device_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }


  /** List Devices Tokens
   * @param {String} device_id Device ID
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
  tokenList(device_id, page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'permission'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/device/token/${device_id}`;
    const method = 'GET';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        amount,
        orderBy,
        fields,
      },
    });
    return request(options);
  }

  /** Create Token for the Device
    * @param  {String} device id
    * @param  {Object} data {permission, expire_time_select, name, expire_time}
    * @return {Promise}
     */
  tokenCreate(device_id, data) {
    data       = data || {};
    data.device = device_id;

    const url    = `${config.api_url}/device/token`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete Token from the Device
    * @param  {String} token_id id
    * @return {Promise}
     */
  tokenDelete(token_id) {
    const url    = `${config.api_url}/device/token/${token_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Get Info of the Device
    * @param  {String} device id
    * @return {Promise}
     */
  info(device_id) {
    if (!device_id || device_id == '') {
      //If ID is send with null, it will get List instead info.
      return new Promise((resolve,reject) => reject('Device ID parameter is obrigatory.'));
    }
    const url    = `${config.api_url}/device/${device_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Create Param for the Device
    * @param  {String} device id
    * @param  {Array<Object>} params list of params to be added or edit
    * @param  {String} params[].key key of the param
    * @param  {String} params[].value value of the param
    * @param  {Boolean} params[].sent sent status of the param
    * @param  {String} [params[].id] id of the paramater for edit (optional)
    * @return {Promise}
     */
  paramSet(device_id, data) {
    const url    = `${config.api_url}/device/${device_id}/params`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Create Param for the Device (Deprecated, use paramSet instead)
    * @param  {String} device id
    * @param  {Object} data {key, value, sent}
    * @return {Promise}
     */
  paramCreate(device_id, data) {
    const url    = `${config.api_url}/device/${device_id}/params`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Edit Param of the Device (Deprecated, use paramSet instead)
    * @param  {String} device id
    * @param  {String} param_id id
    * @param  {Object} data {key, value, sent}
    * @return {Promise}
     */
  paramEdit(device_id, param_id, data) {
    const url    = `${config.api_url}/device/${device_id}/params/${param_id}`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }


  /** List Params for the Device
    * @param  {String} device id
    * @param  {Boolean} sent_status return only sent true or false
    * @return {Promise}
     */
  paramList(device_id, sent_status) {
    const url    = `${config.api_url}/device/${device_id}/params`;
    const params = {
      sent_status,
    };
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Complete remove Param for the Device
    * @param  {String} device id
    * @param  {String} param_id id
    * @return {Promise}
     */
  paramRemove(device_id, param_id) {
    const url    = `${config.api_url}/device/${device_id}/params/${param_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }
}

module.exports = Devices;
