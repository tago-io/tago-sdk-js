'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Realtime        = require('./../utils/').realtime;

/** Class for the device and data */
class Device {
    /** Device
     * @param  {String} Device Token
     * @param  {Boolean} Show Details
     * @return {Object} Device Object
     */
    constructor(token, details) {
        this.token   = token;
        this.default_options = {
            'json': true,
            'headers': default_headers(this)
        };

        if (details) {
            this.default_options.qs = {'details': true};
        }
    }

    /** Info
     * Get information about the current device
     * @return {Promise}
     */
    info() {
        let url    = `${config.api_url}/info`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Insert
     * @param  {Object|Array} data
     * @return {Promise}
     */
    insert(data) {
        data       = data || {};
        let url    = `${config.api_url}/data`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Find
     * @class
     * @param  {JSON} query object
     * @return {Promise}
     */
    find(query_obj) {
        query_obj  = query_obj || {};
        let url    = `${config.api_url}/data`;
        let method = 'GET';
        let params = Object.assign({}, this.default_options.qs || {}, query_obj);

        let options = Object.assign({}, this.default_options, {url, method, params});

        return request(options);
    }

    /** remove
     * @param  {string} variable_or_id
     * @param  {number} [qty] default is 1
     * @return {Promise}
     */
    remove(variable_or_id, qty) {
        let url    = `${config.api_url}/data`;
        if (variable_or_id) {
            url += `/${variable_or_id}`;
        }

        let params = Object.assign({}, this.default_options.qs || {}, qty ? {qty} : {});
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method, params});

        return request(options);
    }

     /** Get Parameters
     * @return {Promise}
     */
    getParams(sent_status) {
        let url     = `${config.api_url}/device/params`;
        let method  = 'GET';
        let params  = {
            sent_status
        };
        let options = Object.assign({}, this.default_options, {url, method, params});
        return request(options);
    }

    /** Mark Parameters as sent
     * @param  {String} param_id Id of the parameter
     * @return {Promise}
     */
    markParam(param_id) {
        let url     = `${config.api_url}/device/params/${param_id}`;
        let method  = 'PUT';
        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

     /** Listen to device socket
     * @param  {function} callback to be executable
     * @return {function}
     */
    listening(callback) {
        this.realtime = new Realtime(this.token);
        this.realtime.get_socket.on('data', callback);
        this.realtime.register = (result) => {
            if (result.error) return console.log(result.error);
            console.log(result.message);
        };
        return Promise.resolve('Trying to listen to the device');
    }

    /** Stop to Listen the device */
    stopListening() {
        if (this.realtime) {
            this.realtime.get_socket.off('data');
            return Promise.resolve('Not listening to the device anymore');
        }
        return Promise.reject('Use .listening before trying to stop listening');
    }
}

module.exports = Device;
