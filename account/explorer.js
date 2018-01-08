'use strict';
const request          = require('../comum/tago_request.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const Realtime         = require('../realtime');

class Explorer {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** List applications on explorer
  */
  list() {
    const url    = `${config.api_url}/explorer`;
    const method = 'GET';

    let options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Get an application from explorer
     * @param  {string} data
     * @return {Promise}
     */
  get(explorer_id) {
    const url    = `${config.api_url}/explorer/${explorer_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Create an application
     * @param  {JSON} data
     * @return {Promise}
     */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/explorer`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
  /** Get an application from explorer
     * @param  {string} application_id
     * @return {Promise}
     */
  getExplorer(application_id) {
    const url    = `${config.api_url}/explorer/${application_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Install an application in your account
     * @param  {string} explorer_id
     * @param  {string} pincode pincode for installation, if needed
     * @return {Promise}
     */
  installApplication(explorer_id, pincode) {
    const data       = {pincode};
    const url    = `${config.api_url}/application/install/${explorer_id}`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
  /** Uninstall the application from your account
     * @param  {String} application_id id
     * @return {Promise}
     */
  uninstallApplication(application_id) {
    const url    = `${config.api_url}/application/${application_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Get an application from your account
     * @param  {string} application_id
     * @return {Promise}
     */
  getApplication(application_id) {
    const url    = `${config.api_url}/application/${application_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** List applications from your account
     * @param  {string} application_id
     * @return {Promise}
     */
  listApplication() {
    const url    = `${config.api_url}/application`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Create an application device
    * @param  {string} application_id
    * @param  {JSON} data
    * @param  {string} data.name
    * @param  {string} data.serie_number
    * @param  {string} data.verification_code
    * @param  {string} data.device
    * @return {Promise}
    */
  createApplicationDevice(application_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/application/${application_id}/device`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }
  /** Remove the application from your account
     * @param  {String} application_id id from application
     * @param  {String} device_id id from device
     * @return {Promise}
     */
  deleteApplicationDevice(application_id, device_id) {
    const url    = `${config.api_url}/explorer/${application_id}/device/${device_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Edit the explorer
     * @param  {String} explorer id
     * @param  {Object} data
     * @return {Promise}
     */
  edit(explorer_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/explorer/${explorer_id}`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete the explorer
     * @param  {String} explorer id
     * @return {Promise}
     */
  delete(explorer_id) {
    const url    = `${config.api_url}/explorer/${explorer_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Create an application device
    * @param  {string} user_id
    * @param  {string} dashboard_id
    * @return {Promise}
    */
  shareDashboard(user_id, dashboard_id) {
    const url    = `${config.api_url}/explorer/share/${dashboard_id}/${user_id}`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }
}

module.exports = Explorer;
