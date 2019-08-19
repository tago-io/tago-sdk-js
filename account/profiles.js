'use strict';
const request          = require('tago/comum/tago_request');
const paramsSerializer = require('tago/comum/paramsSerializer');
const config           = require('tago/config');
const default_headers  = require('tago/comum/default_headers');

/**
 * This class is responsible for handling all the requests of profiles
 * in the account.
 */
class Profile {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /**
   * Lists all the profiles in your account.
   */
  list() {
    const url    = `${config.api_url}/profile`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Edits a profile.
   * @param {String} profile_id The id of the profile.
   */
  info(profile_id) {
    if (!profile_id || profile_id == '') {
      return new Promise((resolve,reject) => reject('Profile ID parameter is obrigatory.'));
    }
    const url    = `${config.api_url}/profile/${profile_id}`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /**
   * Edits a profile.
   * @param {Object} date This is a profile object.
   * @param {String} data.name The name of the profile.
   * @param {String} data.logo_url The picture of the profile.
   */
  edit(profile_id, data) {
    data       = data || {};
    let url    = `${config.api_url}/profile/${profile_id}`;
    let method = 'PUT';

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /**
   * Delete profile
   * @param {String} profile_id
   */
  delete(profile_id) {
    let url = `${config.api_url}/profile/${profile_id}`;
    let method = 'DELETE';

    let options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Creates a profile.
   * @param {Object} date This is a profile object.
   */
  create(data) {
    data       = data || {};
    let url    = `${config.api_url}/profile`;
    let method = 'POST';

    let options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /**
   * List all the usage statistics of your profile.
   * @param {String} profile_id The id of the profile.
   * @param {String} date The date of the report. This should be sent in the format `YYYY-MM-DD`.
   * @param {String} timezone The timezone that will be used to interpret the date.
   */
  usageStatisticList(profile_id, date, timezone) {
    const url    = `${config.api_url}/profile/${profile_id}/statistics`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params: {
        date,
        timezone,
      },
    });
    return request(options);
  }

  /** List Tokens
   * @param {String} profile_id profile ID
   * @param  {Number} page
   * Page of list starting from 1
   * Default: 1
   * @param {Number} amount
   * Amount of items will return
   * Default is 20
   * @param  {JSON} filter
   * JSON of filter
   * Without default
   * Example: {name: 'Motor'}
   * Values allowed: same of fields parameter.
   *
   * TIP: On name you can use * (asterisk) as wildcard.
  * @param  {Array} fields
    * Array of field names
    * Default: ['name']
    * Example: ['name', 'token']
    *
    * Values allowed:
    * name, type, token, created_at
    * @param {String} orderBy
    * Order by a field
    * Examples:
    *  'name,asc'
    *  'name,desc'
    *  'created_at' [default: desc]
    * @return {Promise}
    * Array of tokens in created_at order.
  */
  tokenList(profile_id, page = 1, amount = 20, filter = {}, fields = ['name', 'token', 'created_at'], orderBy = 'created_at,desc') {
    const url = `${config.api_url}/profile/${profile_id}/token`;
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

  /**
   * Fetches the list of shares from a profile.
   * @param {string} profile_id The id of the profile.
   */
  shareList(profile_id) {
    const url = `${config.api_url}/profile/${profile_id}/share`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Shares your profile with someone.
   * @param {string} profile_id The id of the profile to be shared.
   * @param {string} email The account of whom to be shared with.
   */
  shareCreate(profile_id, email) {
    const url = `${config.api_url}/profile/${profile_id}/share`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, { url, method, data: { email } });
    return request(options);
  }

  /**
   * Deletes a share with someone.
   * @param {string} profile_id The id of the profile to be shared.
   * @param {string} share_id The object `id` of acquired from the `shareList` method.
   */
  shareDelete(profile_id, share_id) {
    const url = `${config.api_url}/profile/${profile_id}/share/${share_id}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Creates a token for the profile.
   * @param {String} profile_id the id of the profile that has the token.
   * @param {Object} data the token to be created.
   * @param {String} data.name name for your token. This can be anything that you desire.
   * @param {String} data.email email of your account.
   * @param {String} data.password password of your account.
   *  We use this to validate if it's really you who's making the request.
   * @param {String} data.permission `full` | `write` | `read`.
   * @param {String} data.expire_time `1 hour` | `1 day` | `1 week` | `1 year` | `never`.
   */
  tokenCreate(profile_id, data) {
    data            = data || {};
    data.profile_id = profile_id;

    const url    = `${config.api_url}/profile/${profile_id}/token`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options, {url, method, data});
    return request(options);
  }

  /**
   * Deletes a token from your profile.
   * @param {String} profile_id the id of the profile that has the token.
   * @param {string} token The token string.
   *  This is usually the `token` field that you acquired from the `tokenList` call.
   */
  tokenDelete(profile_id, token) {
    const url    = `${config.api_url}/profile/${profile_id}/token/${token}`;
    const method = 'DELETE';

    const options = Object.assign({}, this.default_options, {url, method});
    return request(options);
  }

  /**
   * Fetches the information from auditlog of this profile.
   * @param  {object} filter - auditlog filter
   * @param  {string} filter.nextToken - next token for pagination
   * @param  {string} filter.ref_id - id of an analysis, device, bucket, action, dashboard, or widget
   * @param  {string} filter.find - text to find on log, can accept "*"
   * @param  {string} filter.start_date - start date
   * @param  {string} filter.end_date - end date
   */
  auditlog(profile_id, params = {}) {
    const url    = `${config.api_url}/profile/${profile_id}/auditlog`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, { url, method, params });
    return request(options);
  }

  /**
   * Gets the information of addons for the profile.
   */
  addonList(profile_id) {
    const url    = `${config.api_url}/profile/${profile_id}/addons`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options,  { url, method });
    return request(options);
  }

  /**
   * Sets the information of addons for the profile.
   */
  addonEdit(profile_id, data) {
    const url    = `${config.api_url}/profile/${profile_id}/addons`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options,  { url, method, data });
    return request(options);
  }

  /**
   * Sets the information of services for the profile. Services are the main resources
   * in your profile, for example data input, data output, etc...
   */
  serviceEdit(profile_id, data) {
    const url    = `${config.api_url}/profile/${profile_id}/services`;
    const method = 'POST';

    const options = Object.assign({}, this.default_options,  { url, method, data });
    return request(options);
  }

  /**
   * Transforms the current token to another profile. The current profile will
   * no longer have the current token, as the current token will be acquired by the profile informed.
   * After this call is done, other requests using this token will work solely for the new profile, and
   * no longer for the current profile.
   */
  transferTokenToAnotherProfile(target_profile_id) {
    const url    = `${config.api_url}/profile/switch/${target_profile_id}`;
    const method = 'PUT';

    const options = Object.assign({}, this.default_options, { url, method });
    return request(options);
  }

  /**
   * Summary of usage of this profile.
   */
  summary(profile_id, params) {
    const url    = `${config.api_url}/profile/${profile_id}/summary`;
    const method = 'GET';

    const options = Object.assign({}, this.default_options, {
      url,
      method,
      paramsSerializer,
      params,
    });
    return request(options);
  }
}

module.exports = Profile;
