'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Actions {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** List Actions
     * @return {Promise}
     */
    list() {
        let url    = `${config.api_url}/action`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Create a Action
    * @param  {JSON} data
    * @return {Promise}
     */
    create(data) {
        data       = data || {};
        let url    = `${config.api_url}/action`;
        let method = 'POST';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Edit the Action
    * @param  {String} action id
    * @param  {Object} data
    * @return {Promise}
     */
    edit(action_id, data) {
        data       = data || {};
        let url    = `${config.api_url}/action/${action_id}`;
        let method = 'PUT';

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Delete the Action
    * @param  {String} action id
    * @return {Promise}
     */
    delete(action_id) {
        let url    = `${config.api_url}/action/${action_id}`;
        let method = 'DELETE';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }

    /** Get Info of the Action
    * @param  {String} action id
    * @return {Promise}
     */
    info(action_id) {
        if (!action_id || action_id == '') {
            //If ID is send with null, it will get List instead info.
            return new Promise((resolve,reject) => reject('Action ID parameter is obrigatory.'));
        }
        let url    = `${config.api_url}/action/${action_id}`;
        let method = 'GET';

        let options = Object.assign({}, this.default_options, {url, method});
        return request(options);
    }
}

module.exports = Actions;
