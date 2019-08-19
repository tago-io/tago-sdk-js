const weather   = require('./weather');
const currency  = require('./currency');
const geocoding = require('./geocoding');
const distance  = require('./distance');

const services = {
  weather,
  currency,
  geocoding,
  distance,
};

class Extra {
  constructor(service, api_key) {
    if (!service) { throw 'Missing parameter service'; } else if (!api_key) { throw 'Missing parameter api_key'; }

    if (!services[service]) {
      throw `Can't find service ${service}`;
    }

    return new services[service](api_key);
  }
}

module.exports = Extra;
