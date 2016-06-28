'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Email {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** Send email
     * @param  {STRING} to
     * @param  {STRING} subject
     * @param  {STRING} message
     * @param  {STRING} from (optional)
     * @return {Promise}
     */
    send(to, subject, message, from) {
        let url    = `${config.api_url}/analysis/services/email/send`;
        let method = 'POST';
        let data = { to, subject, message, from };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }


}

module.exports = Email;
