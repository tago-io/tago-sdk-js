'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Widgets {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** Create a Dashboard Widget
    * @param  {JSON} data
    * @return {Promise}
     */
    create(dash_id = '',data = {}) {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(dash_id = '', query_id = '', data = {}) {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${query_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Dashboard Widget
    * @param  {String} dashboard id
    * @return {Promise}
     */
    delete(dash_id = '', query_id = '') {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${query_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Dashboard Widget
    * @param  {String} dashboard id
    * @return {Promise}
     */
    info(dash_id = '', query_id = '') {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${query_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Widgets;
