'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class MQTT {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** publish MQTT
     * @param  {string} topic - topic of the message
     * @param  {string} message - Message scope
     * @param  {string} [bucket] - Bucket to receive message
     * @return {Promise}
     */
  publish(topic, message, bucket) {
    let url    = `${config.api_url}/analysis/services/mqtt/publish`;
    let method = 'POST';
    let data = { topic, message, bucket };

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }


}

module.exports = MQTT;
