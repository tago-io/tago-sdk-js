'use strict';
const Currency  = require('./currency.js');
const Distance  = require('./distance.js');
const Email     = require('./email.js');
const Geocoding = require('./geocoding.js');
const SMS       = require('./sms.js');
const Socket    = require('./socket.js');
const Weather   = require('./weather.js');
const Console   = require('./console.js');

class Services {
    constructor(token) {
        this.token = token;
    }

    get sms() {
        return new SMS(this.token);
    }

    get console() {
        return new Console(this.token);
    }

    get email() {
        return new Email(this.token);
    }

    get geocoding() {
        return new Geocoding(this.token);
    }

    get currency() {
        return new Currency(this.token);
    }

    get distance() {
        return new Distance(this.token);
    }

    get socket() {
        return new Socket(this.token);
    }

    get weather() {
        return new Weather(this.token);
    }
}

module.exports = Services;
