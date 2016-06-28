'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Distance {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /**
     * Get a distance
     * @param  {STRING} to
     * @param  {STRING} message Message to be send
     * @return {Promise}
     */
    measure(origins, destinations, language, mode) {
        let url    = `${config.api_url}/analysis/services/distance/measure`;
        let method = 'post';
        let data = { origins, destinations, language, mode};

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }


}

module.exports = Distance;
