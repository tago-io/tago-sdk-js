'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Widgets         = require('./dashboards.widgets.js');
const Socket   = require('./../utils/').socket;

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
        let url    = `${config.api_url}/dashboard`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Dashboard
    * @param  {JSON} data
    * @param  {string} data.name - Name of the dashboard
    * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Dashboard
    * @param  {String} dashboard id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(dashboard_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    delete(dashboard_id) {
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    info(dashboard_id) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Dashboard ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/dashboard/${dashboard_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Dashboard
    * @param  {String} dashboard id of the dashboard
    * @param  {function} func function to run when socket is triggered
    * @return {Promise}
     */
    listening(dashboard_id, func) {
        if (!dashboard_id || dashboard_id == '') {
            //If ID is send with null, it will get List instead info.
            return Promise.reject('Dashboard ID parameter is obrigatory.');
        }
        
        this.socket = new Socket(this.token);
        this.socket.listen_dashboard(dashboard_id, func);

        return Promise.resolve('Listening to Dashboard ' +dashboard_id);
    }

    // ----------- Sub-methods -----------
    get widgets() {
        return new Widgets(this.token);
    }
}

module.exports = Dashboards;
