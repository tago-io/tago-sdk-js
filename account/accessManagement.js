const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class AccessManagement {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  list(page = 1, fields = ['id', 'name', 'tags'], filter = {}, amount = 20, orderBy = 'name,asc') {
    const url = `${config.api_url}/am`;
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

  create(data) {
    data = data || {};
    const url = `${config.api_url}/am`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  edit(am_id, data) {
    data = data || {};
    const url = `${config.api_url}/am/${am_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  delete(am_id) {
    const url = `${config.api_url}/am/${am_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  info(am_id) {
    if (!am_id || am_id === '') {
      return Promise.reject('am ID parameter is obrigatory.');
    }

    const url = `${config.api_url}/am/${am_id}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = AccessManagement;
