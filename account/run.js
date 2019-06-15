'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const default_headers  = require('../comum/default_headers.js');

class TagoIORUN {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };
  }

  edit(data) {
    data = data || {};
    let url = `${config.api_url}/run`;
    let method = 'PUT';

    let options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }

  info() {
    let url = `${config.api_url}/run`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  listUsers(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    let url = `${config.api_url}/run/users`;
    let method = 'GET';

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
      },
    });
    return request(options);
  }

  getUserInfo(userID) {
    let url = `${config.api_url}/run/users/${userID}`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  userEdit(userID, data) {
    data = data || {};
    let url = `${config.api_url}/run/users/${userID}`;
    let method = 'PUT';

    let options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }

  createUser(data) {
    data = data || {};
    let url = `${config.api_url}/run/users`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }

  deleteUser(userID) {
    const url = `${config.api_url}/run/users/${userID}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  emailTest({ subject, body }) {
    const url = `${config.api_url}/run/email_test`;
    const method = 'POST';
    const data = { subject, body };

    const options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }
}

module.exports = TagoIORUN;
