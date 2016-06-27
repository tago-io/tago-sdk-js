'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Devices {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Devices
     * @return {Promise}
     */
    list() {
        let url    = `${config.api_url}/device`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Device
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data = {}) {
        let url    = `${config.api_url}/device`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Device
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(device_id, data = {}) {
        let url    = `${config.api_url}/device/${device_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Device
    * @param  {String} device id
    * @return {Promise}
     */
    delete(device_id) {
        let url    = `${config.api_url}/device/${device_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** List Tokens of the Device
    * @param  {String} device id
    * @return {Promise}
     */
    tokenList(device_id) {
        let url    = `${config.api_url}/device/token/${device_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Device
    * @param  {String} device id
    * @return {Promise}
     */
    info(device_id) {
        if (!device_id || device_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Device ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/device/${device_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }
}

module.exports = Devices;
