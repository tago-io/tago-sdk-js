'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

/** Class for the device and data */
class Middleware {
    /** Device
     * @param  {String} Middleware Token
     * @return {Object} Middleware Object
     */
    constructor(token, details) {
        this.token   = token;
        this.default_options = {
            'json': true,
            'headers': default_headers(this)
        };

        if (details) {
            this.default_options.qs = {'details': true};
        }
    }

    /** 
     * Get token of the device by its serial number.
     * Return nothing if the serie number is not associeted with middleware
     * @param  {STRING} serial_number serial number of the device
     * @return {Promise}
     */
    getBySerieNum(serial_number) {
        let url    = `${config.api_url}/middleware/get_by_serienum/${serial_number}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }
}

module.exports = Middleware;
