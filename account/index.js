'use strict';
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const batchRequest     = require('../comum/batchRequest.js');

const Actions                 = require('./actions.js');
const Analysis                = require('./analysis.js');
const Files                   = require('./files.js');
const Buckets                 = require('./buckets.js');
const Dashboards              = require('./dashboards.js');
const Devices                 = require('./devices.js');
const Notifications           = require('./notifications.js');
const Middlewares             = require('./middlewares.js');
const Tags                    = require('./tags.js');
const PaymentMethods          = require('./paymentMethods');
const Plan                    = require('./plan');
const PaymentHistory          = require('./paymentHistory');
const Explore                 = require('./explore');
const Connector               = require('./connector');
const Template                = require('./template');
const AccessManagement        = require('./accessManagement');
const TagoIORUN               = require('./run');
const Profiles                = require('./profiles');
const ServiceAuthorization    = require('./service.authorization');

class Account {
  constructor(token) {
    this.token = token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  // ----------- Account methods -----------

  /** Account info
     * @return {Promise}
     */
  info() {
    const url    = `${config.api_url}/account`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Account Summary
   * @param  {Object} params [optional]
   * @return {Promise}
   */
  summary(params = undefined) {
    const url = `${config.api_url}/account/summary`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method, params });
    return request(options);
  }

  /** Account statistics
     * @param  {Object} params
     * @param  {String} paramsmonth
     * @param  {String} paramsyear
     * @return {Promise}
     */
  statistics(params) {
    const url    = `${config.api_url}/statistics`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Edit Account
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
  edit(data) {
    data       = data || {};
    const url    = `${config.api_url}/account`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete Account
    * @param  {String} device id
    * @param  {Object} data
    * @return {Promise}
     */
  delete() {
    const url    = `${config.api_url}/account`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** List Profiles of the Account
     * @return {Promise}
     */
  profileList() {
    const url    = `${config.api_url}/account/profile`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Generate a new Profile
     * @return {Promise}
     */
  profileCreate(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/profile`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** List Profiles of the Account
     * @return {Promise}
     */
  profileDelete(profile_id) {
    const url    = `${config.api_url}/account/profile/${profile_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** List Tokens of the Account
   * @param  {Number} page
   * Page of list starting from 1
   * Default: 1
   * @param {Number} amount
   * Amount of items will return
   * Default is 20
   * @param  {JSON} filter
   * JSON of filter
   * Without default
   * Example: {name: 'Admin'}
   * Values allowed: same of fields parameter.
   *
   * TIP: On name you can use * (asterisk) as wildcard.
  * @param  {Array} fields
    * Array of field names
    * Default: ['name']
    * Example: ['name', 'token']
    *
    * Values allowed:
    * name, type, permission, token, expire_time, created_at.
    * @param {String} orderBy
    * Order by a field
    * Examples:
    *  'name,asc'
    *  'name,desc'
    *  'created_at' [default: desc]
    * @return {Promise}
    * Array of tokens in created_at order.
  */
  tokenList(page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'permission'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/account/profile/token`;
    const method = 'GET';

    let options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        amount,
        orderBy,
        fields,
      },
    });
    return request(options);
  }

  /** Generate Account Token
     * @return {Promise}
     */
  tokenCreate(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/profile/token`;
    const method = 'POST';

    const headers = default_headers();
    const options = {url, method, data, headers};
    return request(options);
  }

  /** List Tokens of the Account
     * @return {Promise}
     */
  tokenDelete() {
    const url    = `${config.api_url}/account/profile/token`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Retrieve list of profiles for login and do Login
     * @param  {string} data.email - email for login
     * @param  {string} data.password - password for login
     * @return {Promise}
     */
  login(data) {
    data       = data || {};
    const url    = `${config.api_url}/account/login`;
    const method = 'POST';

    const headers = default_headers();
    const options = {url, method, data, headers};
    return request(options);
  }

  /** Send password recover email
     * @param  {string} email - email of the account
     * @return {Promise}
     */
  static passwordRecover(email) {
    const url    = `${config.api_url}/account/passwordreset/${email}`;
    const method = 'GET';

    const headers = default_headers();
    const options = {url, method, headers};
    return request(options);
  }

  /** Change password using token of the password recover
     * @param  {string} password - new password
     * @return {Promise}
     */
  passwordChange(password) {
    const data   = { password };
    const url    = `${config.api_url}/account/passwordreset`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Create new account on Tago
     * @param  {string} name - name of the account
     * @param  {string} email - email of the account
     * @param  {string} password - password of the account
     * @param  {string} cpassword - password confirmation of the account
     * @param  {string} country - country of the account
     * @param  {string} timezone - timezone for the account
     * @param  {string} company - company of the account
     * @param  {boolean} newsletter - newsletter activated
     * @return {Promise}
     */
  static create(name, email, password, cpassword, country, timezone, company, newsletter, developer) {
    const url    = `${config.api_url}/account`;
    const method = 'POST';
    const data = {
      name, email, password, cpassword, country, timezone, company, newsletter, developer,
    };

    const headers = default_headers();
    const options = {url, method, headers, data};
    return request(options);
  }

  /** Re-send confirmation account email
     * @param  {string} email - email of the account
     * @return {Promise}
     */
  static resendConfirmation(email) {
    const url    = `${config.api_url}/account/resend_confirmation/${email}`;
    const method = 'GET';

    const headers = default_headers();
    const options = {url, method, headers};
    return request(options);
  }

  /** Confirm account creation
     * @param  {string} token - confirmation token
     * @return {Promise}
     */
  static confirmAccount(token) {
    const url    = `${config.api_url}/account/confirm/${token}`;
    const method = 'GET';

    const headers = default_headers();
    const options = {url, method, headers};
    return request(options);

  }

  /** Confirm account creation
     * @param  {object} filter - auditlog filter
     * @param  {string} filter.nextToken - next token for pagination
     * @param  {string} filter.ref_id - id of an analysis, device, bucket, action, dashboard, or widget
     * @param  {string} filter.find - text to find on log, can accept "*"
     * @param  {string} filter.start_date - start date
     * @param  {string} filter.end_date - end date
     * @return {Promise}
     */
  auditlog(params = {}) {
    const url    = `${config.api_url}/auditlog`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /**
   * Send a batch commands
   * @param {Array<JSON>} batchData
   * @param {Boolean} async
   * Async=true method send all commands in same time,
   * Async=false send command one by one, and stop if got a error
   * Examples:
   * [
   *   {"method": "GET", "endpoint": "/data", "headers": {"token": "38935657-8491-4702-b951-a03374410db0"} },
   *   {"method": "GET", "endpoint": "/device" }
   * ]
   */
  batch(batchData, async = false) {
    return batchRequest.call(this, batchData, async);
  }

  // ----------- Sub-methods -----------
  get actions() {
    return new Actions(this.token);
  }
  get analysis() {
    return new Analysis(this.token);
  }
  get buckets() {
    return new Buckets(this.token);
  }
  get files() {
    return new Files(this.token);
  }
  get dashboards() {
    return new Dashboards(this.token);
  }
  get devices() {
    return new Devices(this.token);
  }
  get notifications() {
    return new Notifications(this.token);
  }
  get middlewares() {
    return new Middlewares(this.token);
  }
  get tags() {
    return new Tags(this.token);
  }
  get paymentMethods() {
    return new PaymentMethods(this.token);
  }
  get plan() {
    return new Plan(this.token);
  }
  get paymentHistory() {
    return new PaymentHistory(this.token);
  }
  get explore() {
    return new Explore(this.token);
  }
  get connector() {
    return new Connector(this.token);
  }
  get template() {
    return new Template(this.token);
  }
  get accessManagement() {
    return new AccessManagement(this.token);
  }
  get run() {
    return new TagoIORUN(this.token);
  }
  get ServiceAuthorization() {
    return new ServiceAuthorization(this.token);
  }
  get profiles() {
    return new Profiles(this.token);
  }
}


module.exports = Account;
