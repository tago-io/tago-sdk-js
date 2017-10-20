'use strict';
/* eslint no-unused-vars: 0 */

// process.env.DEBUG = '*';

const socketclient = require('socket.io-client');
const config  = require('../config.js');
const options = {
  'reconnectionDelay': 10000,
  'reconnection': true
};

class Realtime {
  constructor(acc_token) {
    this.token = acc_token;
    this.waitFor = new Set();
    this._shouldUpdateWaitFor = false;
    this.updateWaitFor();
  }

  connect() {
    if (this.socket) Promise.resolve();

    return new Promise((resolve, reject) => {
      const socket = socketclient(config.realtime_url, options);

      socket.once('connect', () => socket.emit('register', this.token));
      socket.on('connect', this.onConnect);

      socket.once('register', ({ status, result }) => {
        if (!status) return reject(result);

        this.socket = socket;
        resolve();
      });

      socket.on('register', () => (this._shouldUpdateWaitFor = true));

      socket.on('reconnecting', this.onReconnecting);
      socket.on('disconnect', this.onDisconnect);
      socket.on('reconnect', () => {
        socket.emit('register', this.token);
        this.onReconnect();
      });

      socket.on('error', this.onError);
      socket.on('waitFor', this.onWaitForResponse);
    });
  }

  /**
   * Listening an event from Realtime Server
   * @param {String} eventName Name of event
   * @param {String} func Function to trigger
   */
  listening(eventName, func) {
    this.waitFor.add(eventName);
    this.socket.off(eventName);
    this.socket.on(eventName, func);
    this._shouldUpdateWaitFor = true;
  }

  /**
   * Remove listening on Realtime Server
   * @param {String} eventsName Name|s of event
   * The param eventsName can be a string or array
   */
  stopListening(eventsName) {
    eventsName = Array.isArray(eventsName) ? eventsName : [eventsName];
    eventsName.forEach(item => {
      this.waitFor.delete(item);
      this.socket.off(item);
    });
    this._shouldUpdateWaitFor = true;
  }

  updateWaitFor() {
    setInterval(() => {
      if (this._shouldUpdateWaitFor && (this.socket && this.socket.connected)) {
        this._shouldUpdateWaitFor = false;
        this.socket.emit('waitFor', Array.from(this.waitFor));
      }
    }, 500);
  }

  /**
   * @interface
   */
  onConnect() {}
  /**
   * @interface
   */
  onReconnecting() {}
  /**
   * @interface
   */
  onReconnect() {}
  /**
   * @interface
   */
  onDisconnect() {}
  /**
   * @interface
   * @param {String} error Message of error
   */
  onError(error) {}
  /**
   * @interface
   * @param {String} msg Message from server
   * @example
   * { status: true, result: 'Attached 2 events' }
   */
  onWaitForResponse(msg) { }
}

module.exports = Realtime;
