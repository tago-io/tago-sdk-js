'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Buckets {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Buckets
     * @return {Promise}
     */
    list() {
        let uri    = `${config.api_uri}/bucket`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Create a Bucket
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data = {}) {
        let uri    = `${config.api_uri}/bucket`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Bucket
    * @param  {String} bucket id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(bkt_id, data = {}) {
        let uri    = `${config.api_uri}/bucket/${bkt_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
    delete(bkt_id) {
        let uri    = `${config.api_uri}/bucket/${bkt_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
    info(bkt_id) {
        if (!bkt_id || bkt_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Bucket ID parameter is obrigatory.'));
        }
        let uri    = `${config.api_uri}/bucket/${bkt_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Buckets;
