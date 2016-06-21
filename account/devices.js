'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Devices {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Devices
     * @return {Promise}
     */
    list() {
        let uri    = `${config.api_uri}/device`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Devices;