"use strict";

var superagent = require('superagent');
var infra      = require('../infra.js');

function Device (token) {
    this.token = token;
}

Device.prototype.insert = function(data, callback) {
    superagent
        .post(infra.tago_api('data'))
        .send(data)
        .set('Device-Token', this.token)
        .end(infra.done(callback));
};

module.exports = Device;