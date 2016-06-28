'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class SOCKET {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /**
     * Send a Socket message to tago
     * @param  {STRING} bucket_id
     * @param  {JSON}   data
     * @return {Promise}
     */
    send(bucket_id, data_entry) {
        let url    = `${config.api_url}/analysis/services/socket/send`;
        let method = 'post';
        let data = { bucket_id, 'data':data_entry};

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }


}

module.exports = SOCKET;
