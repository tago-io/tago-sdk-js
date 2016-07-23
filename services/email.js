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
     * @param  {string} to - E-mail address to be sent.
     * @param  {string} subject - Subject of the e-mail
     * @param  {string} message - Message scope for the e-mail
     * @param  {string} [from] - E-mail to be indicated for reply
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
