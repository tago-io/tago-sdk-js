'use strict';
const Email     = require('./email.js');
const SMS       = require('./sms.js');
const Socket    = require('./socket.js');
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

    get socket() {
        return new Socket(this.token);
    }

}

module.exports = Services;
