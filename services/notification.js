
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Notification {
  constructor(analysis_token) {
    this.token = analysis_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** Send Notification
     * You can add ref_id from a bucket or dashboard, if it is valid it will show up a button Go To Dashboard
     * Any account with share of the dashboard/bucket will receive too.
     * @param  {string} topic - topic of the message
     * @param  {string} message - Message scope
     * @param  {string} [ref_id] - Dashboard/Bucket ID for "Go To" button.
     * @return {Promise}
     */
  send(title, message, ref_id) {
    const url    = `${config.api_url}/analysis/services/notification/send`;
    const method = 'POST';
    const data = { title, message, ref_id };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }
}

module.exports = Notification;
