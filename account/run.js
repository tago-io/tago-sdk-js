'use strict';
const request = require('../comum/tago_request.js');
const config = require('../config.js');
const default_headers = require('../comum/default_headers.js');

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

  listUsers() {
    let url = `${config.api_url}/run/users`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, { url, method });
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
}

module.exports = TagoIORUN;
