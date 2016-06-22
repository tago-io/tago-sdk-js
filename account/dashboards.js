'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Widgets         = require('./dashboards_widgets.js');

class Dashboards {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Dashboards
     * @return {Promise}
     */
    list() {
        let uri    = `${config.api_uri}/dashboard`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Create a Dashboard
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data = {}) {
        let uri    = `${config.api_uri}/dashboard`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Dashboard
    * @param  {String} dashboard id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(query_id = '', data = {}) {
        let uri    = `${config.api_uri}/dashboard/${query_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    delete(query_id = '') {
        let uri    = `${config.api_uri}/dashboard/${query_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    info(query_id = '') {
        let uri    = `${config.api_uri}/dashboard/${query_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    // ----------- Sub-methods -----------
    get widgets() {
        return new Widgets(this.token);
    }
}

module.exports = Dashboards;
