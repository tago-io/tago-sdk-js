
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const request         = require('../comum/tago_request.js');

class RunUser {
  constructor(token) {
    this.token = token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** User info
   * @return {Promise}
   */
  info(tagoRunURL) {
    const url = `${config.api_url}/run/${tagoRunURL}/info`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Edit User Info
   * @return {Promise}
   */
  editInfo(tagoRunURL, changes = {}) {
    const url = `${config.api_url}/run/${tagoRunURL}/info`;
    const method = 'PUT';
    const data = changes;

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Create new TagoIO Run User (Anonymous)
   * @return {Promise}
   */
  static create(tagoRunURL, newUserObj) {
    const url = `${config.api_url}/run/${tagoRunURL}/signup`;
    const method = 'POST';
    const data = newUserObj;

    const headers = default_headers();
    const options = { url, method, headers, data };
    return request(options);
  }

  /** Login at TagoIO Run User (Anonymous)
 * @return {Promise}
 */
  static login(tagoRunURL, { email, password }) {
    const url = `${config.api_url}/run/${tagoRunURL}/login`;
    const method = 'POST';
    const data = {
      email, password,
    };

    const headers = default_headers();
    const options = { url, method, headers, data };
    return request(options);
  }

  /** Confirm User on TagoIO Run (Anonymous)
 * @return {Promise}
 */
  static confirmUser(tagoRunURL, token) {
    const url    = `${config.api_url}/run/${tagoRunURL}/confirm/${token}`;
    const method = 'GET';

    const headers = default_headers();
    const options = { url, method, headers };
    return request(options);
  }

  /**
   * Sends a password recover e-mail.
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {String} email - email of the account.
   * @return {Promise}
   */
  static passwordRecover(tagoRunURL, email) {
    const url    = `${config.api_url}/run/${tagoRunURL}/passwordreset/${email}`;
    const method = 'GET';

    const headers = default_headers();
    const options = { url, method, headers };
    return request(options);
  }

  /**
   * Change password using token of the password recover.
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {string} password - new password
   * @return {Promise}
   */
  passwordChange(tagoRunURL, password) {
    const data   = { password };
    const url    = `${config.api_url}/run/${tagoRunURL}/passwordreset`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * List notifications.
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {string} password - new password
   * @return {Promise}
   */
  notificationList(tagoRunURL) {
    const url    = `${config.api_url}/run/${tagoRunURL}/notification`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /**
   * Mark notification as read
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {string|array} notifications array of notification ids or single id
   * @return {Promise}
   */
  notificationMarkRead(tagoRunURL, notifications) {
    if (!Array.isArray(notifications)) {
      notifications = [notifications];
    }
    const url    = `${config.api_url}/run/${tagoRunURL}/notification`;
    const method = 'PUT';
    const data = {
      notification_ids: notifications,
    };

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * Trigger notification button
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {string} notification_id id of the notification
   * @param  {string} btn_id id of the button
   * @return {Promise}
   */
  notificationButton(tagoRunURL, notification_id, btn_id) {
    const url  = `${config.api_url}/run/${tagoRunURL}/notification/${notification_id}/${btn_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /**
   * Delete notification
   * @param  {String} tagoRunURL - the url of tago run.
   * @param  {string} notification_id id of the notification
   * @return {Promise}
   */
  notificationDelete(tagoRunURL, notification_id) {
    const url    = `${config.api_url}/run/${tagoRunURL}/notification/${notification_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /**
   * Retrieves a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   */
  paramGet(tagoRunURL, key) {
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /**
   * Creates or updates a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   * @param {String} value - value of the parameter.
   */
  paramSet(tagoRunURL, key, value) {
    const data   = { value };
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /**
   * Delete a custom parameter of a run user.
   * The run user is identified by the token in the constructor.
   * @param {String} tagoRunURL - the url of tago run.
   * @param {String} key - identifier of the parameter.
   */
  paramDelete(tagoRunURL, key) {
    const url    = `${config.api_url}/run/${tagoRunURL}/sdb/${key}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }
}


module.exports = RunUser;
