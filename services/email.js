
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Email {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** Send email
     * @param  {string} to - E-mail address to be sent.
     * @param  {string} subject - Subject of the e-mail
     * @param  {string} message - Message scope for the e-mail
     * @param  {string} [from] - E-mail to be indicated for reply (optional)
     * @param  {JSON} [attachment] - Message scope for the e-mail  (optional)
     * @param  {string} attachment.archive - archive itself
     * @param  {string} attachment.filename - Name for the archive
     * @param  {string} [html] - HTML archive  (optional)
     * @param  {string} [whitelabel_url] - Whitelabel url to set domain  (optional)
     * @return {Promise}
     */
  send(to, subject, message, from, attachment, html, whitelabel_url) {
    const url    = `${config.api_url}/analysis/services/email/send`;
    const method = 'POST';
    const data = { to, subject, message, from, attachment, html, whitelabel_url };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = Email;
