'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');


/**
 * Get the actual version of tago api
 * @return {Object}
 */
function version() {
    const url    = `${config.api_url}/status`;
    const method = 'GET';
    const headers = default_headers();

    const options = Object.assign({}, headers, {url, method});
    return request(options);
}

module.exports = version;