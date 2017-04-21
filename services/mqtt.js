'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class MQTT {
    constructor(analysis_token) {
        this.token = analysis_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** Send MQTT
     * @param  {string} topic - topic of the message
     * @param  {string} message - Message scope
     * @return {Promise}
     */
    send(topic, message) {
        let url    = `${config.api_url}/analysis/services/mqtt/publish`;
        let method = 'POST';
        let data = { topic, message };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }


}

module.exports = MQTT;
