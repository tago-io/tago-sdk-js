'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Realtime        = require('../realtime');

class Notifications {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** List Notifications
     * @param  {JSON} params to find
     * @param  {string} params.type type of notification
     * @param  {string} params.start_date start date as timestamp
     * @param  {string} params.end_date end date as timestamp
     * @param  {string} params.ref_id reference id of the notification
     * @return {Promise}
     */
  list(params) {
    const url    = `${config.api_url}/notification`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Mark notifications as read
     * @param  {string|array} notifications array of notification ids or single id
     * @return {Promise}
     */
  markAsRead(notifications) {
    if (!Array.isArray(notifications)) {
      notifications = [notifications];
    }
    const url    = `${config.api_url}/notification/read`;
    const method = 'PUT';
    const data = {
      notification_ids: notifications,
    };

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Accept a notification with condition
     * @param  {string|} notification_id id of the notificationm
     * @return {Promise}
     */
  accept(notification_id) {
    const url    = `${config.api_url}/notification/accept/${notification_id}`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Refuse a notification with condition
     * @param  {string|} notification_id id of the notificationm
     * @return {Promise}
     */
  refuse(notification_id) {
    const url    = `${config.api_url}/notification/refuse/${notification_id}`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Remove a notification
     * @param  {string|} notification_id id of the notificationm
     * @return {Promise}
     */
  remove(notification_id) {
    const url    = `${config.api_url}/notification/${notification_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Start listening the notifications
   * @param  {function} func Function to run when realtime is triggered
   * @param  {Realtime} realtimeInstance Realtime instance (const Realtime = require(tago/realtime);)
  */
  listening(func, realtimeInstance) {
    if (!(realtimeInstance instanceof Realtime)) {
      return Promise.reject('Invalid realtime instance');
    }

    realtimeInstance.listening('notification', func);

    return Promise.resolve('Listening to Notifications.');
  }

  /** Stop to listen notifications events
   * @param  {Realtime} realtimeInstance Realtime instance (const Realtime = require(tago/realtime);)
   * You should use same Realtime instance for listening and stopListening
  */
  stopListening(realtimeInstance) {
    if (!(realtimeInstance instanceof Realtime)) {
      return Promise.reject('Invalid realtime instance');
    }

    realtimeInstance.stopListening('notification');

    return Promise.resolve('Stoped listening Notifications.');
  }

  /**
     * Register device Token on Push Notification Service
     * @param {String} device_token Token of device
     * @param {String} platform Platform of device
     * @internal
     */
  registerDevice(device_token, platform) {
    const url = `${config.api_url}/notification/push/register`;
    const method = 'POST';
    const data = {
      device_token,
      platform,
    };

    const options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }

  /**
     * Unregister device Token on Push Notification Service
     * @param {String} device_token Token of device
     * @internal
     */
  unRegisterDevice(device_token) {
    const url = `${config.api_url}/notification/push/unregister`;
    const method = 'POST';
    const data = {
      device_token,
    };

    const options = Object.assign({}, this.default_options, { url, method, data });
    return request(options);
  }
}

module.exports = Notifications;
