'use strict';
const request         = require('../comum/service_request.js');
const default_headers = require('../comum/default_headers.js');

class Geocoding {
  constructor(key) {
    this.key = key;
    this.default_options = {
      'json':    true,
      'headers': default_headers(this)
    };
  }

  /** Get Addres by Geolocation
     * @param  {STRING} geolocation - Pass lat,lng
     * @return {Promise}
     */
  getAddress(geolocation) {
    if (typeof geolocation === 'string') {
      let geoplited = geolocation.split(',');

      if (geolocation.length > 1) {
        geolocation = [geoplited[0].trim(), geoplited[1].trim()];
      } else {
        return Promise.reject('Invalid geolocation');
      }
    } else if (geolocation.coordinates) {
      geolocation = geolocation.coordinates;
    } else {
      return Promise.reject('Invalid geolocation');
    }

    geolocation = [geolocation[0], geolocation[1]].join(',');

    let url    = 'https://maps.googleapis.com/maps/api/geocode/json';
    let method = 'GET';
    let params = { 
      latlng: geolocation, 
      key: this.key 
    };

    let options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

  /** Get Geolocation by Address
     * @param  {STRING} address
     * @return {Promise}
     */
  getGeolocation(address) {
    let url    = 'https://maps.googleapis.com/maps/api/geocode/json';
    let method = 'GET';
    let params = { address, key: this.key };

    let options = Object.assign({}, this.default_options, {url, method, params});
    return request(options);
  }

}

module.exports = Geocoding;