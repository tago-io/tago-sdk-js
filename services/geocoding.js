'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class GEOCODING {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** Get Addres by Geolocation
     * @param  {STRING} geolocation - Pass lat,lng
     * @return {Promise}
     */
    get_address(address) {
        let url    = `${config.api_url}/analysis/services/geocoding/get_address`;
        let method = 'POST';
        let data = { address };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Get Geolocation by Address
     * @param  {STRING} address
     * @return {Promise}
     */
    get_geolocation(geolocation) {
        let url    = `${config.api_url}/analysis/services/geocoding/get_geolocation`;
        let method = 'POST';
        let data = { geolocation };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

}

module.exports = GEOCODING;
