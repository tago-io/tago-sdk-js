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
        let url    = `${config.api_url}/analyze`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Analyze
     * @param  {JSON} data
     * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/analyze`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Analyze
     * @param  {String} analyze id
     * @param  {Object} data
     * @return {Promise}
     */
    edit(analyze_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/analyze/${analyze_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Analyze
     * @param  {String} analyze id
     * @return {Promise}
     */
    delete(analyze_id) {
        let url    = `${config.api_url}/analyze/${analyze_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
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
        let url    = `${config.api_url}/analyze/${analyze_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Force Analyze to Run
     * @param  {String} analyze id
     * @return {Promise}
     */
    run(analyze_id) {
        let url    = `${config.api_url}/analyze/${analyze_id}/run`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
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
        realtime.get_socket.on('analyze:'+analyze_id, func);

        return Promise.resolve('Listening to Analyze ' +analyze_id);
    }

    /** Stop to listen the analysis by its ID
    * @param  {String} analyze_id id of the analysis
     */
    stop_litening(analyze_id, realtime) {
        if (!this.realtime && !realtime) return;

        realtime = realtime || this.realtime;
        realtime.get_socket.off('analyze:'+analyze_id);
    }
}

module.exports = Analysis;
