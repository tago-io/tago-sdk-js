'use strict';
const config = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const request = require('../comum/tago_request.js');

const Actions    = require('./actions.js');
const Analysis   = require('./analysis.js');
const Buckets    = require('./buckets.js');
const Dashboards = require('./dashboards.js');
const Devices    = require('./devices.js');

class Account {
    constructor(token) {
        this.token = token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    // ----------- Account methods -----------

    /** Account info
     * @return {Promise}
     */
    info() {
        let uri    = `${config.api_uri}/account`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** List Tokens of the Account
    * @return {Promise}
     */
    tokenlist() {
        let uri    = `${config.api_uri}/account/token`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
    // ----------- Sub-methods -----------
    get actions() {
        return new Actions(this.token);
    }
    get analysis() {
        return new Analysis(this.token);
    }
    get buckets() {
        return new Buckets(this.token);
    }
    get dashboards() {
        return new Dashboards(this.token);
    }
    get devices() {
        return new Devices(this.token);
    }
}

module.exports = Account;
