
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Socket {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /**
     * Send a Socket message to tago
     * @param  {STRING} bucket_id
     * @param  {JSON}   data
     * @return {Promise}
     */
  send(bucket_id, data_entry) {
    const url    = `${config.api_url}/analysis/services/socket/send`;
    const method = 'post';
    const data = { bucket_id, data: data_entry };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = Socket;
