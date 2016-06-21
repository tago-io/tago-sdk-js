'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Device {
    /** Device
     * @param  {String} Device Token
     * @param  {Boolean} Show Details
     * @return {Object} Device Object
     */
    constructor(token, details = false) {
        this.token   = token;
        this.default_options = {
            'json': true,
            'headers': default_headers(this)
        };

        if (details) {
            this.default_options.qs = {'details': true};
        }
    }

    /** Insert
     * @param  {Object|Array} data
     * @return {Promise}
     */
    insert(data = {}) {
        let uri    = `${config.api_uri}/data`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Find
     * @param  {JSON} query object
     * @return {Promise}
     */
    find(query_obj = {}) {
        let uri    = `${config.api_uri}/data`;
        let method = 'GET';
        let qs     = Object.assign({}, this.default_options.qs || {}, query_obj);

        let options = Object.assign({}, this.default_options, {uri, method, qs});
        return request(options);
    }
}

module.exports = Device;