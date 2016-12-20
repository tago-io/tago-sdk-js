'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Realtime          = require('./../utils/').realtime;

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
        const url    = `${config.api_url}/analysis`;
        const method = 'GET';

        const options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Analyze
     * @param  {JSON} data
     * @return {Promise}
     */
    create(data) {
        data       = data || {};
        const url    = `${config.api_url}/analysis`;
        const method = 'POST';

        const options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Analyze
     * @param  {String} analyze id
     * @param  {Object} data
     * @return {Promise}
     */
    edit(analyze_id, data) {
        data       = data || {};
        const url    = `${config.api_url}/analysis/${analyze_id}`;
        const method = 'PUT';

        const options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Analyze
     * @param  {String} analyze id
     * @return {Promise}
     */
    delete(analyze_id) {
        const url    = `${config.api_url}/analysis/${analyze_id}`;
        const method = 'DELETE';

        const options = Object.assign({}, this.default_options, {url, method});
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
        const url    = `${config.api_url}/analysis/${analyze_id}`;
        const method = 'GET';

        const options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Force Analyze to Run
     * @param  {String} analyze id
     * @param  {Object} scope simulate scope for analysis (optional)
     * @return {Promise}
     */
    run(analyze_id, scope) {
        const data = { scope };
        const url    = `${config.api_url}/analysis/${analyze_id}/run`;
        const method = 'POST';

        const options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Start listening the analysis
     * @param  {String} analyze_id id
     * @param  {function} function function to run when realtime is triggered
     * @param  {class} realtime an realtime with personalized function. Be sure to call listening only inside a connect function (optional)
     */
    listening(analyze_id, func, realtime) {
        if (!analyze_id || analyze_id == '') {
            //If ID is send with null, it will get List instead info.
            return Promise.reject('Analyze ID parameter is obrigatory.');
        }

        if (!this.realtime && !realtime) this.realtime = new Realtime(this.token);

        realtime = realtime || this.realtime;
        realtime.get_socket.on(`analyze:${analyze_id}`, func);

        return Promise.resolve('Listening to Analyze ' +analyze_id);
    }

    /** Stop to listen the analysis by its ID
     * @param  {String} analyze_id id of the analysis
     */
    stopeListening(analyze_id, realtime) {
        if (!this.realtime && !realtime) return;

        realtime = realtime || this.realtime;
        realtime.get_socket.off(`analyze:${analyze_id}`);
    }

    /** Generate a new token for the analysis
     * @param  {String} analysis id
     * @return {Promise}
     */
    tokenGenerate(analyze_id) {
        const url    = `${config.api_url}/analysis/${analyze_id}/token`;
        const method = 'GET';

        const options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Upload a file (base64) to Analysis. Automatically erase the old one.
     * @param  {String} analysis id
     * @param  {String} file file base64
     * @return {Promise}
     */
    uploadScript(analyze_id, file) {
        const data = { file };
        const url    = `${config.api_url}/analysis/${analyze_id}/upload`;
        const method = 'POST';

        const options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = Analysis;
