'use strict';
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');

class Files {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json': true,
      'headers': default_headers(this)
    };
  }

  /**
   * list
   * @param {String} path
   * @param {String} pagination_token
   * @param {Number} qty
   */
  list(path = '/', pagination_token = undefined, qty = 300) {
    let url = `${config.api_url}/files`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        path,
        pagination_token,
        qty
      },
    });

    return request(options);
  }

  /**
   * uploadBase64
   * @param {Array.<{filename:String, file:String, public:Boolean}>} arrayOfFileObjects
   * Upload an array of files to TagoIO
   *
   * The filename parameter is also full path
   *
   * Exemple:
   *  [ { filename: '/myfiles/myfile.ext', file: 'StringWithBase64' }]
   */
  uploadBase64(arrayOfFileObjects) {
    let url = `${config.api_url}/files`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects
    });

    return request(options);
  }
}

module.exports = Files;
