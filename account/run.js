
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const default_headers  = require('../comum/default_headers.js');

class TagoIORUN {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  edit(data) {
    data = data || {};
    const url = `${config.api_url}/run`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  info() {
    const url = `${config.api_url}/run`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  listUsers(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
    const url = `${config.api_url}/run/users`;
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

  getUserInfo(userID) {
    const url = `${config.api_url}/run/users/${userID}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  loginAsUser(userID) {
    const url = `${config.api_url}/run/users/${userID}/login`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  userEdit(userID, data) {
    data = data || {};
    const url = `${config.api_url}/run/users/${userID}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  createUser(data) {
    data = data || {};
    const url = `${config.api_url}/run/users`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  deleteUser(userID) {
    const url = `${config.api_url}/run/users/${userID}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  emailTest({ subject, body }) {
    const url = `${config.api_url}/run/email_test`;
    const method = 'POST';
    const data = { subject, body };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  notificationCreate(user_id, data) {
    data = data || {};
    data.run_user = user_id;

    const url = `${config.api_url}/run/notification`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  notificationEdit(notification_id, data) {
    data = data || {};
    const url = `${config.api_url}/run/notification/${notification_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  notificationDelete(notification_id) {
    const url = `${config.api_url}/run/notification/${notification_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  notificationList(user_id) {
    const url = `${config.api_url}/run/notification/${user_id}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = TagoIORUN;
