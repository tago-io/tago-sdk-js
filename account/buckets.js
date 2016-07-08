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
        let url    = `${config.api_url}/bucket`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Bucket
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags[] - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/bucket`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Bucket
    * @param  {String} bucket id
    * @param  {object} data
    * @param  {string} data.name - Name of the bucket
    * @param  {string} data.description - description of the bucket
    * @param  {boolean} data.active - Set if bucket is active or not
    * @param  {object[]} tags[] - bucket tags for categorization
    * @param  {string} tags[].key - key of the tag
    * @param  {string} tags[].value - value of the tag
    * @return {Promise}
     */
    edit(bkt_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Bucket
    * @param  {String} bucket id
    * @return {Promise}
     */
    delete(bkt_id) {
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
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
        let url    = `${config.api_url}/bucket/${bkt_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }
}

module.exports = Buckets;
