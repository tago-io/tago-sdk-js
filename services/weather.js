'use strict';
const request         = require('../comum/tago_request.js');
const config          = require('../config.js');
const default_headers = require('../comum/default_headers.js');

class WEATHER {
    constructor(acc_token) {
        this.token = acc_token;
        this.default_options = {
            'json':    true,
            'headers': default_headers(this)
        };
        this._query = null;
        this._full  = false;
        this._lang  = 'EN';
    }

    /** Set to come with full description, or not
     * @param  {BOOLEAN} full
     * @return {WEATHER}
     */
    full(full) {
        if (full === true) {
            this._full = true;
        }
        return this;
    }

    /** Set a zipcode
     * @param  {STRING} zipcode
     * @return {WEATHER}
     */
    zipcode(zipcode) {
        this._query = zipcode;
        return this;
    }

    /** Set a address name
     * @param  {STRING} name
     * @return {WEATHER}
     */
    name(name) {
        this._query = name;
        return this;
    }

    /** Set a lang
     * @param  {STRING} lang
     * @return {WEATHER}
     */
    lang(lang) {
        this._language = lang;
        return this;
    }

    /** Set a geolocation
     * @param  {STRING} geolocation
     * @return {WEATHER}
     */
    geolocation(geolocation) {
        if (typeof geolocation === 'string') {
            let geoplited = geolocation.split(',');

            if (geolocation.length > 1) {
                geolocation = [geoplited[0].trim(), geoplited[1].trim()];
            } else {
                throw 'Invalid geolocation';
            }
        } else if (geolocation.coordinates) {
            geolocation = geolocation.coordinates;
        } else {
            throw 'Invalid geolocation';
        }

        this._query = [geolocation[0], geolocation[1]].join(',');
        return this;
    }


    /** Get the current weather conditions.
     * @return {Promise}
     */
    current() {
        let url    = `${config.api_url}/analysis/services/weather/current`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Get history of the weather broadcast in the last week
     * @return {Promise}
     */
    history(date) {
        let url    = `${config.api_url}/analysis/services/weather/history`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang, 'date':date };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Returns a summary of the weather for the next 10 days. This includes high and low temperatures, a string text forecast and the conditions.
     * @return {Promise}
     */
    forecast() {
        let url    = `${config.api_url}/analysis/services/weather/forecast`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }

    /** Returns the short name description, expiration time and a long text description of a severe alert, if one has been issued for the searched upon location.
     * @return {Promise}
     */
    alerts() {
        let url    = `${config.api_url}/analysis/services/weather/alerts`;
        let method = 'POST';
        let data = { 'query': this._query,  'full': this._full, 'lang': this._lang };

        let options = Object.assign({}, this.default_options, {url, method, data});
        return request(options);
    }
}

module.exports = WEATHER;
