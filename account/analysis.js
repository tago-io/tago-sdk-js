'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Analysis {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Analysis
     * @return {Promise}
     */
    list() {
        let uri    = `${config.api_uri}/analyze`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Create a Analyze
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data = {}) {
        let uri    = `${config.api_uri}/analyze`;
        let method = 'POST';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Edit the Analyze
    * @param  {String} analyze id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(analyze_id, data = {}) {
        let uri    = `${config.api_uri}/analyze/${analyze_id}`;
        let method = 'PUT';
        let body   = data;

        let options = Object.assign({}, this.default_options, {uri, method, body});
        return request(options);
    }

    /** Delete the Analyze
    * @param  {String} analyze id
    * @return {Promise}
     */
    delete(analyze_id) {
        let uri    = `${config.api_uri}/analyze/${analyze_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Get Info of the Analyze
    * @param  {String} analyze id
    * @return {Promise}
     */
    info(analyze_id) {
        if (!analyze_id || analyze_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Analyze ID parameter is obrigatory.'));
        }
        let uri    = `${config.api_uri}/analyze/${analyze_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }

    /** Force Analyze to Run
    * @param  {String} analyze id
    * @return {Promise}
     */
    run(analyze_id) {
        let uri    = `${config.api_uri}/analyze/${analyze_id}/run`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {uri, method});
        return request(options);
    }
}

module.exports = Analysis;
