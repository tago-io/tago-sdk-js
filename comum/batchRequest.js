const config = require('../config.js');
const request = require('./tago_request.js');

function batch(batchData, async) {
  const url = `${config.api_url}/batch?async=${async}`;
  const method = 'POST';

  const options = Object.assign({}, this.default_options, { url, method, data: batchData });
  return request(options);
}

module.exports = batch;
