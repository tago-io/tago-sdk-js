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

  /** Get Info of the Connector
  * @param  {String} connector_id id
  * @param  {String[]} fields field array to fetch
  * @return {Promise}
  */
  info(connector_id, fields = ['id', 'name']) {
    if (!connector_id || connector_id === '') {
    // If ID is send with null, it will get List instead info.
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
}

module.exports = Connector;
