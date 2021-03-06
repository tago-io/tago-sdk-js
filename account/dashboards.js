const request          = require('../comum/tago_request.js');
const paramsSerializer = require('../comum/paramsSerializer.js');
const config           = require('../config.js');
const default_headers  = require('../comum/default_headers.js');
const Widgets          = require('./dashboards.widgets.js');
const share            = require('./_share.js');

class Dashboards {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** List Dashboards
     * @param  {Number} page
     * Page of list starting from 1
     * Default: 1
     * @param  {Array} fields
     * Array of field names
     * Default: ['id', 'label']
     * Example: ['id', 'label', 'visible']
     *
     * Values allowed:
     * id, label, description, public_token, group_by,
     * account, tags, created_at, updated_at.
     * @param  {JSON} filter
     * JSON of filter
     * Without default
     * Example: {label: 'Motor'}
     * Values allowed: same of fields parameter.
     *
     * TIP: On name you can use * (asterisk) as wildcard.
     * @param {Number} amount
     * Amount of items will return
     * Default is 20
     * @param {String} orderBy
     * Order by a field
     * Examples:
     *  'name,asc'
     *  'name,desc'
     *  'name' [default: asc]
     * @return {Promise}
     * Array of dashboards in alphabetically order.
    */
  list(page = 1, fields = ['id', 'name'], filter = {}, amount = 20, orderBy = 'label,asc') {
    if (!arguments.length) return this._list(); // @deprecated
    const url = `${config.api_url}/dashboard`;
    const method = 'GET';

    const options = { ...this.default_options,
      url,
      method,
      paramsSerializer,
      params: {
        page,
        filter,
        fields,
        amount,
        orderBy,
      } };
    return request(options);
  }

  /**
     * It return old api style
     * @deprecated
     */
  _list() {
    const parameters = [
      1,
      ['account', 'created_at', 'group_by', 'id', 'label', 'tags', 'visible'],
      {},
      1000,
      'label',
    ];
    return this.list.call(this, ...parameters);
  }

  /** Create a Dashboard
    * @param  {JSON} data
    * @param  {string} data.name - Name of the dashboard
    * @return {Promise}
     */
  create(data) {
    data       = data || {};
    const url    = `${config.api_url}/dashboard`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Edit the Dashboard
    * @param  {String} dashboard id
    * @param  {Object} data
    * @return {Promise}
     */
  edit(dashboard_id, data) {
    data       = data || {};
    const url    = `${config.api_url}/dashboard/${dashboard_id}`;
    const method = 'PUT';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Delete the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
  delete(dashboard_id) {
    const url    = `${config.api_url}/dashboard/${dashboard_id}`;
    const method = 'DELETE';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Get Info of the Dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
  info(dashboard_id) {
    if (!dashboard_id || dashboard_id === '') {
      // If ID is send with null, it will get List instead info.
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    }
    const url    = `${config.api_url}/dashboard/${dashboard_id}`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

  /** Duplicate the dashboard to your own account
    * @param  {String} dashboard id
    * @param  {JSON} data - Name of the dashboard
    * @param  {JSON} data{}.setup - special setup for duplicate
    * @param  {boolean} data{}.new_label - optional new dashboard label
    * @return {Promise}
     */
  duplicate(dashboard_id, data) {
    data = data || {};
    if (!dashboard_id || dashboard_id === '') {
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    }

    const url    = `${config.api_url}/dashboard/${dashboard_id}/duplicate`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }



  /** ***************************************** */

  /** Get share list of the dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
  shareList(dashboard_id) {
    if (!dashboard_id || dashboard_id === '') {
      // If ID is send with null, it will get List instead info.
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    }
    return share.list('dashboard', dashboard_id, this.default_options);
  }

  /** Share the dashboard with another person
    * @param  {String} dashboard id
    * @param  {JSON} data
    * @param  {String} data{}.email - Email to receive invitation
    * @param  {String} data{}.message - Scope message for the email
    * @param  {boolean} data{}.copy_me - true to send a copy to yourself
    * @param  {String} data{}.whitelabel_url - Url without https. it's sent email template
    * @param  {boolean} data{}.allow_tags - Send dashboard tags. Default false
    * @param  {boolean} data{}.allow_share - Allow the user to share dashboard with other emails. Default false
    * @return {Promise}
     */
  shareSendInvite(dashboard_id, data) {
    data = data || {};
    if (!dashboard_id || dashboard_id === '') {
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    } else if (!data.email) {
      return Promise.reject('data.email parameter is obrigatory.');
    }
    return share.invite('dashboard', dashboard_id, data, this.default_options);
  }

  /** Change permissions of the bucket
    * @param  {String} share id
    * @param  {JSON} data -
    * @param  {String} data{}.email - Email to change permissions
    * @param  {String} data{}.permission - New Permission to be applied
    * @return {Promise}
     */
  shareEdit(share_id, data) {
    data = data || {};
    if (!share_id || share_id === '') {
      return Promise.reject('Share ID parameter is obrigatory.');
    } else if (!data.email) {
      return Promise.reject('data.email parameter is obrigatory.');
    }
    return share.edit('dashboard', share_id, data, this.default_options);
  }

  /** Remove share of the bucket
    * @param  {String} share id
    * @return {Promise}
     */
  shareDelete(share_id) {
    if (!share_id || share_id === '') {
      return Promise.reject('Share ID parameter is obrigatory.');
    }
    return share.remove('dashboard', share_id, this.default_options);
  }
  /** ***************************************** */


  /** Generate a new public token for the dashboard
    * @param  {String} dashboard id
    * @param  {String} expire_time time when token will expire. (optional)
    * @return {Promise}
     */
  genPublicToken(dashboard_id, expire_time = 'never') {
    if (!dashboard_id || dashboard_id === '') {
      // If ID is send with null, it will get List instead info.
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    }
    const url    = `${config.api_url}/dashboard/${dashboard_id}/share/public`;
    const method = 'GET';
    const params = { expire_time };

    const options = { ...this.default_options, url, method, params };
    return request(options);
  }

  /** Clone the dashboard with special parameters
    * @param  {String} dashboard id
    * @param  {JSON} data - Name of the dashboard
    * @param  {String} data{}.email - Email to receive invitation
    * @param  {String} data{}.message - Scope message for the email
    * @param  {JSON} data{}.setup - special setup for clone
    * @param  {boolean} data{}.copy_me - true to send a copy to yourself
    * @return {Promise}
     */
  shareClone(dashboard_id, data) {
    data = data || {};
    if (!dashboard_id || dashboard_id === '') {
      return Promise.reject('Dashboard ID parameter is obrigatory.');
    } else if (!data.email) {
      return Promise.reject('data.email parameter is obrigatory.');
    }

    const url    = `${config.api_url}/dashboard/${dashboard_id}/share/copy`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  /** Get list of devices related with dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
  listDevicesRelated(dashboard_id) {
    const url = `${config.api_url}/dashboard/${dashboard_id}/devices`;
    const method = 'GET';

    const options = { ...this.default_options, url, method };
    return request(options);
  }

    /** Get list of analysis related with a dashboard
    * @param  {String} dashboard id
    * @return {Promise}
     */
    listAnalysisRelated(dashboard_id) {
      const url = `${config.api_url}/dashboard/${dashboard_id}/analysis`;
      const method = 'GET';

      console.log('URL IS', url);

      const options = { ...this.default_options, url, method };
      return request(options);
    }

  /**
   * Runs an analysis located in a widget's header button.
   * @param {String} analysis_id The id of the analysis to run.
   * @param {String} dashboard_id The id of the dashboard that contains the widget.
   * @param {String} widget_id The id of the widget that contains the header button.
   * @param {*} scope Data to send to the analysis.
   */
  runWidgetHeaderButtonAnalysis(analysis_id, dashboard_id, widget_id, scope) {
    const data = { scope };
    const url    = `${config.api_url}/analysis/${analysis_id}/run/${dashboard_id}/${widget_id}`;
    const method = 'POST';

    const options = { ...this.default_options, url, method, data };
    return request(options);
  }

  // ----------- Sub-methods -----------
  get widgets() {
    return new Widgets(this.token);
  }
}

module.exports = Dashboards;
