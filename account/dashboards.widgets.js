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
    create(dash_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard/${dash_id}/widget/`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(dash_id, widget_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @return {Promise}
     */
    delete(dash_id, widget_id) {
        let url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
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
        let url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get all data for the current widget
    * @param  {String} widget id
    * @return {Promise}
    */
    data(widget_id) {
        let url    = `${config.api_url}/dashboard/widget/data/${widget_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Update value of variable for the current widget
    * @param  {String} widget_id
    * @param  {String} variable
    * @param  {String} value
    * @param  {String} bucket
    * @param  {String} origin
    * @return {Promise}
    */
    updateVariable(widget_id, variable, value, bucket, origin) {
        let url    = `${config.api_url}/dashboard/widget/data/${widget_id}`;
        let method = 'POST';
        let data = {
            variable,
            value,
            bucket,
            origin
        };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = Widgets;
