'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Attachment {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** Send Attachment
     * @param  {string|base64} attachment.archive - archive itself
     * @param  {string} attachment.filename - Name for the archive
     * @param  {string} [attachment.type] - Type of the archive (base64 example) (optional)
     * @return {Promise}
     */
  upload(archive, filename, type) {
    let url    = `${config.api_url}/analysis/services/attachment/upload`;
    let method = 'POST';
    let data = { archive,filename,type };

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
}

module.exports = Attachment;
