'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Currency {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /**
     * Convert between two coins
     * @param  {STRING} c_from  To convert from
     * @param  {STRING} c_to    To convert to
     * @return {Promise}
     */
    convert(c_from, c_to) {
        let url    = `${config.api_url}/analysis/services/currency/convert`;
        let method = 'post';
        let data = { c_from, c_to};

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }


}

module.exports = Currency;
