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
    * @param  {String} dashboard id
    * @param  {JSON} data
    * @return {Promise}
     */
    create(dash_id,data = {}) {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(dash_id, widget_id, data = {}) {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @return {Promise}
     */
    delete(dash_id, widget_id) {
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @return {Promise}
     */
    info(dash_id, widget_id) {
        if (!widget_id || widget_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Widget ID parameter is obrigatory.'));
        }
        let uri    = `${config.api_uri}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Widgets;