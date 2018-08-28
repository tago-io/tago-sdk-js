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

  /**
   * Move/Rename Files
   * @param {Array.<{from:String, to:String}>} arrayOfFileObjects
   *
   * Exemple:
   *  [ { from: '/myfiles/myOldName.ext', to: '/myfiles/newFolder/andNewName.ext' }]
   */
  move(arrayOfFileObjects) {
    let url = `${config.api_url}/files`;
    let method = 'PUT';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects
    });

    return request(options);
  }

  /**
   * Delete Folder or Files
   * @param {Array<String>} arrayOfFiles Array with files to be deleted
   *
   * Exemple:
   * ['/myfiles/myOldName.ext', /myfiles/newFolder/test.ext']
   */
  delete(arrayOfFiles) {
    let url = `${config.api_url}/files`;
    let method = 'DELETE';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      data: arrayOfFiles
    });

    return request(options);
  }

  /**
   * Check if file is private or public
   * @param {String} file Path of file
   *
   */
  checkPermission(file) {
    let url = `${config.api_url}/files/permission`;
    let method = 'GET';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        file,
      },
    });

    return request(options);
  }

  /**
   * Make the file private or public
   * @param {Array.<{file:String, public:Boolean}>} arrayOfFileObjects
   *
   * Exemple:
   *  [ { file: '/myfiles/myFile.txt', public: true }]
   */
  changePermission(arrayOfFileObjects) {
    let url = `${config.api_url}/files/permission`;
    let method = 'PUT';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      data: arrayOfFileObjects
    });

    return request(options);
  }

  /**
   * Get file with authenticate token for privates files
   * @param {String} url Full TagoIO File url
   * Get a file with authenticate token valid for 120 seconds.
   */
  getFileURLSigned(url) {
    const method = 'GET';
    if (String(url).indexOf('.tago.io/file/') === -1) {
      return Promise.reject(`${url} is not a TagoIO files url`);
    }

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      params: {
        noRedirect: true,
      }
    });

    return request(options);
  }
}

module.exports = Files;
