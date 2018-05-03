'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');
const Realtime        = require('../realtime');
const paramsSerializer = require('../comum/paramsSerializer.js');

class Widgets {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** Create a Dashboard Widget
    * @param  {String} dashboard id
    * @param  {JSON} data
    * @return {Promise}
    */
  create(dash_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/dashboard/${dash_id}/widget/`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Edit the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @param  {Object} data
    * @return {Promise}
    */
  edit(dash_id, widget_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @return {Promise}
    */
  delete(dash_id, widget_id) {
    const url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Get Info of the Dashboard Widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @return {Promise}
    */
  info(dash_id, widget_id) {
    if (!widget_id || widget_id == '') {
      //If ID is send with null, it will get List instead info.
      return new Promise((resolve,reject) => reject('Widget ID parameter is obrigatory.'));
    }
    const url    = `${config.api_url}/dashboard/${dash_id}/widget/${widget_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /** Get all data for the current widget
    * @param  {String} dashboard id
    * @param  {String} widget id
    * @param  {JSON} overwrite It can overwrite 'start_date', 'end_date', 'timezone' fields.
    * @return {Promise}
    */
  getData(dashboard_id, widget_id, overwrite = {}) {
    const url    = `${config.api_url}/data/${dashboard_id}/${widget_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: { overwrite }
    });
    return request(options);
  }

  /** Update value of variable for the current widget
    * @param  {String} dashboard id
    * @param  {String} widget_id
    * @param  {JSON} data
    * @return {Promise}
    */
  sendData(dashboard_id, widget_id, data) {
    const url    = `${config.api_url}/data/${dashboard_id}/${widget_id}`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Run analysis without inserting data to bucket
    * @param  {String} dashboard id
    * @param  {String} widget_id
    * @param  {JSON} data
    * @return {Promise}
    */
  runAnalysis(dashboard_id, widget_id, data) {
    const url    = `${config.api_url}/data/${dashboard_id}/${widget_id}/run`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /** Delete data by it's id, bucket and variable must be associeted with the widget
    * @param  {String} dashboard id
    * @param  {String} widget_id
    * @param  {JSON} data
    * @return {Promise}
    */
  deleteData(dashboard_id, widget_id, ids) {
    const url    = `${config.api_url}/data/${dashboard_id}/${widget_id}`;
    const method = 'DELETE';
    const params = { ids };

    const options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Start listening the widget data
   * @param  {String} widget_id Widget ID
   * @param  {function} func Function to run when realtime is triggered
   * @param  {Realtime} realtimeInstance Realtime instance (const Realtime = require(tago/realtime);)
  */
  listening(widget_id, func, realtimeInstance) {
    if (!widget_id || widget_id == '') {
      return Promise.reject('Widget ID parameter is obrigatory.');
    }

    if (!(realtimeInstance instanceof Realtime)) {
      return Promise.reject('Invalid realtime instance');
    }

    realtimeInstance.listening(`widget:${widget_id}`, func);

    return Promise.resolve('Listening to Widget Data.');
  }

  /** Stop to listen widget data
   * @param  {String} widget_id Widget ID
   * @param  {Realtime} realtimeInstance Realtime instance (const Realtime = require(tago/realtime);)
   * You should use same Realtime instance for listening and stopListening
  */
  stopListening(widget_id, realtimeInstance) {
    if (!(realtimeInstance instanceof Realtime)) {
      return Promise.reject('Invalid realtime instance');
    }

    realtimeInstance.stopListening(`widget:${widget_id}`);

    return Promise.resolve('Stopped listening Widget Data.');
  }

  /** Generate a new token for the embed widgets
   * It can regenerate the token if call it multi-times
   * @param  {String} dashboard_id Dashboard ID
   * @param  {String} widget_id Widget ID
   * @return {Promise}
  */
  tokenGenerate(dashboard_id, widget_id) {
    const url = `${config.api_url}/dashboard/${dashboard_id}/widget/${widget_id}/token`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }
}

module.exports = Widgets;
