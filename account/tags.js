
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Tags {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** Get all Keys from certain type of section
    * @param  {String} type
    * Type list to get the array of tags keys
    * It can be: bucket, device, dashboard, action, analysis
    * @return {Promise} Array of key name
    */
  getTagKeys(type) {
    const url    = `${config.api_url}/tags/keys/${type}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}

module.exports = Tags;
