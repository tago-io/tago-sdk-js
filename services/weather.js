'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class Weather {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
    }

    /** set params for the Weather
     * @private
     * @param  {object} params 
     */
    _setParams(params) {
        this._query = params.query || null;
        this._full  = params.full || false;
        this._lang  = params.lang || 'EN';
    }

    /** 
     * Get the current weather conditions.
     * @param  {string} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} lang - Set a language. Default is 'EN'
     * @return {Promise}
     */
    current(query, full, lang) {
        this._setParams({query, full, lang});
        let url    = `${config.api_url}/analysis/services/weather/current`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** 
     * Get history of the weather broadcast in the last week
     * @param  {string} date - Get history until specified date
     * @param  {string|object} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} lang - Set a language. Default is 'EN'
     * @return {Promise}
     */
    history(date, query, full, lang) {
        this._setParams({query, full, lang});
        let url    = `${config.api_url}/analysis/services/weather/history`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang, date };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** 
     * Returns a summary of the weather for the next 10 days. This includes high and low temperatures, a string text forecast and the conditions.
     * @param  {string} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} lang - Set a language. Default is 'EN'
     * @return {Promise}
     */
    forecast(query, full, lang) {
        this._setParams({query, full, lang});
        let url    = `${config.api_url}/analysis/services/weather/forecast`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Returns the short name description, expiration time and a long text description of a severe alert, if one has been issued for the searched upon location.
     * @param  {string} query Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full Set to come with full description, or not
     * @param  {string} lang Set a language. Default is 'EN'
     * @return {Promise}
     */
    alerts(query, full, lang) {
        this._setParams({query, full, lang});
        let url    = `${config.api_url}/analysis/services/weather/alerts`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = Weather;
