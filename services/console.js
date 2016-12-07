'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Console {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    log(message, timestamp) {
        if (!timestamp) timestamp = new Date().getTime();
        let url    = `${config.api_url}/analysis/services/console/send`;
        let method = 'post';
        let data = { message, timestamp };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = Console;
