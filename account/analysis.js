'use strict';
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const Realtime         = require('./../utils/').realtime;

class Analysis {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }
    
    /** List Analysis
     * @param  {Number} page 
     * Page of list starting from 1
     * Default: 1
     * @param  {Array} fields
     * Array of field names
     * Default: ['id', 'name']
     * Example: ['id', 'name', 'visible']
     * 
     * Values allowed:
     * id, name, description, visible, backup, data_retention, last_backup,
     * account, tags, created_at, updated_at.
     * @param  {JSON} filter 
     * JSON of filter
     * Without default
     * Example: {name: 'Motor'}
     * Values allowed: same of fields parameter.
     * 
     * TIP: On name you can use * (asterisk) as wildcard.
     * @param {Number} amount
     * Amount of items will return
     * Default is 20
     * @param {String} orderBy
     * Order by a field
     * Examples:
     *  'name,asc'
     *  'name,desc'
     *  'name' [default: asc]
     * @return {Promise}
     * Array of analysis in alphabetically order.
    */
    list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'name,asc') {
        if (!arguments.length) return this._list(); // @deprecated
        const url    = `${config.api_url}/analysis`;
        const method = 'GET';

        let options = Object.assign({}, this.default_options, {
            url,
            method,
            paramsSerializer,
            params: {
                page,
                filter,
                fields,
                amount,
                orderBy,
            },
        });
        return request(options);
    }

    /**
     * It return old api style
     * @deprecated
     */
    _list() {
        const parameters = [
            1,
            ['active', 'id', 'interval', 'language', 'last_run', 'name', 'run_on', 'tags'],
            {},
            1000,
            'name'
        ];
        return this.list.call(this, ...parameters);
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

    /** Start listening the analysis console
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
    stopListening(analyze_id, realtime) {
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
     * @param  {String} file_name name for the file
     * @param  {String} file file base64
     * @return {Promise}
     */
    uploadScript(analyze_id, file_name, file) {
        const data = { file, file_name };
        const url    = `${config.api_url}/analysis/${analyze_id}/upload`;
        const method = 'POST';

        const options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = Analysis;
