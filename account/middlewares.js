'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Middlewares {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** 
     * Return list of all middlewares available for tokens
     * @param  {Boolean} owner if true, get a list of middlewares and tokens owned by the account
     * @return {Promise}
     */
    list(owner) {
        let url    = `${config.api_url}/middleware`;
        if (owner) url = `${url}?owner=true`;
        const method = 'GET';

        const options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** 
     * Remove older token and returns a new token for the middleware.
     * @param  {String} middleware_name name of the middleware
     * @return {Promise}
     */
    genToken(middleware_name) {
        const url    = `${config.api_url}/middleware/gen_token/${middleware_name}`;
        const method = 'PUT';

        const options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }
}

module.exports = Middlewares;
