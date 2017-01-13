'use strict';
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const request         = require('../comum/tago_request.js');

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
        let url    = `${config.api_url}/account`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Account statistics
     * @return {Promise}
     */
    statistics() {
        let url    = `${config.api_url}/statistics`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Edit Account
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(data) {
        data       = data || {};
        let url    = `${config.api_url}/account`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete Account
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
    delete() {
        let url    = `${config.api_url}/account`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** List Profiles of the Account
     * @return {Promise}
     */
    profileList() {
        let url    = `${config.api_url}/account/profile`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Generate a new Profile
     * @return {Promise}
     */
    profileCreate(data) {
        data       = data || {};
        let url    = `${config.api_url}/account/profile`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data}); 
        return request(options);
    }

    /** List Profiles of the Account
     * @return {Promise}
     */
    profileDelete(profile_id) {
        let url    = `${config.api_url}/account/profile/${profile_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** List Tokens of the Account
     * @return {Promise}
     */
    tokenList() {
        let url    = `${config.api_url}/account/profile/token`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Generate Account Token
     * @return {Promise}
     */
    tokenCreate(data) {
        data       = data || {};
        let url    = `${config.api_url}/account/profile/token`;
        let method = 'POST';

        let headers = default_headers();
        let options = {url, method, data, headers};
        return request(options);
    }

    /** List Tokens of the Account
     * @return {Promise}
     */
    tokenDelete() {
        let url    = `${config.api_url}/account/profile/token`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Retrieve list of profiles for login
     * @param  {string} data.email - email for login
     * @param  {string} data.password - password for login
     * @return {Promise}
     */
    login(data) {
        data       = data || {};
        let url    = `${config.api_url}/account/profile/login`;
        let method = 'POST';

        let headers = default_headers();
        let options = {url, method, data, headers};
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
