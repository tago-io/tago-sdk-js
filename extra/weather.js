
const request         = require('../comum/service_request.js');
const default_headers = require('../comum/default_headers.js');

/*
Wunderground docs: http://www.wunderground.com/weather/api/d/docs
*/
class Weather {
  constructor(key) {
    this.key = key;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  /** set params for the Weather
     * @private
     * @param  {object} params
     */
  _setParams(params) {
    this._query = params.query || null;
    this._full = params.full || false;
    this._lang = params.lang || 'EN';
  }
  /** verify if geolocation is a valid Geolocation
         * @param  {string|array} geolocation
         */
  geolocation_verify(geolocation) {
    if (typeof geolocation === 'string') {
      const geoplited = geolocation.split(',');

      if (geolocation.length > 1) {
        geolocation = [geoplited[0].trim(), geoplited[1].trim()];
      } else {
        return null;
      }
    } else if (geolocation.coordinates) {
      geolocation = geolocation.coordinates;
    } else {
      return null;
    }

    return [geolocation[0], geolocation[1]].join(',');
  }

  /**
     * Get the current weather conditions.
     * @param  {string} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} [lang] - Set a language. Default is 'EN'
     * @return {Promise}
     */
  current(query, full, lang) {
    return new Promise((resolve, reject) => {
      this._setParams({ query, full, lang });
      const url = `http://api.wunderground.com/api/${this.key}/lang:${this._lang}/conditions/q/${encodeURIComponent(this._query)}.json`;
      const method = 'GET';

      const options = { ...this.default_options,
        url,
        method };

      request(options).then((result) => {
        if (!result.current_observation && result.response.results) {
          return reject(`Invalid address, ${result.response.results.length} match.`);
        } else if (!result.current_observation) {
          return reject('Invalid address');
        }

        result = result.current_observation;
        try {
          delete result.image;
          delete result.icon_url;
          delete result.forecast_url;
          delete result.history_url;
          delete result.ob_url;
          delete result.estimated;

          if (!this.full) {
            delete result.display_location;
            delete result.observation_location;
          }
        } catch (e) {
          console.log(`weather system, ${e}`);
        }
        resolve(result);
      }).catch((error) => reject(error));
    });
  }

  /**
     * Get history of the weather broadcast in the last week
     * @param  {string} date - Get history until specified date
     * @param  {string|object} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} [lang] - Set a language. Default is 'EN'
     * @return {Promise}
     */
  history(date, query, full, lang) {
    return new Promise((resolve, reject) => {
      this._setParams({ query, full, lang });
      try {
        date = new Date(date);
        date = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
      } catch (e) {
        return reject('Invalid date');
      }

      const url = `http://api.wunderground.com/api/${this.key}/lang:${this._lang}/history_${date}/q/${encodeURIComponent(this._query)}.json`;
      const method = 'GET';

      const options = { ...this.default_options,
        url,
        method };

      request(options).then((result) => {
        result = result.history;
        resolve(result);
      })
        .catch((error) => reject(error));
    });
  }

  /**
     * Returns a summary of the weather for the next 10 days. This includes high and low temperatures, a string text forecast and the conditions.
     * @param  {string} query - Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full - Set to come with full description, or not
     * @param  {string} [lang] - Set a language. Default is 'EN'
     * @return {Promise}
     */
  forecast(query, full, lang) {
    return new Promise((resolve, reject) => {
      this._setParams({ query, full, lang });
      const url    = `http://api.wunderground.com/api/${this.key}/lang:${this._lang}/forecast10day/q/${encodeURIComponent(this._query)}.json`;
      const method = 'GET';

      const options = { ...this.default_options,
        url,
        method };

      request(options).then((result) => {
        try {
          result = result.forecast.simpleforecast.forecastday;
          result.forEach((x) => {
            delete x.icon_url;
            delete x.skyicon;
          });
        } catch (e) {
          return reject('Error on parse weather forecast');
        }
        resolve(result);
      }).catch((error) => reject(error));
    });
  }

  /** Returns the short name description, expiration time and a long text description of a severe alert, if one has been issued for the searched upon location.
     * @param  {string} query Could be an address name, a zipcode or a geojson.
     * @param  {boolean} full Set to come with full description, or not
     * @param  {string} [lang] Set a language. Default is 'EN'
     * @return {Promise}
     */
  alerts(query, full, lang) {
    return new Promise((resolve, reject) => {
      this._setParams({ query, full, lang });
      const url    = `http://api.wunderground.com/api/${this.key}/lang:${this._lang}/alerts/q/${encodeURIComponent(this._query)}.json`;
      const method = 'GET';

      const options = { ...this.default_options,
        url,
        method };

      request(options).then((result) => {
        delete result.response;

        resolve(result);
      })
        .catch((error) => reject(error));
    });
  }
}

module.exports = Weather;

