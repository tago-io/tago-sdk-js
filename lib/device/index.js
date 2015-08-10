"use strict";

var superagent = require('superagent');
var socket     = require('./socket.js');
var infra      = require('../infra.js');

function Device (token) {
    if (!token) {
        throw 'Tago Device Token not found';
    }

    this.token = token;
}

Device.prototype.insert = function(data, callback) {
    superagent
        .post(infra.tago_api('data'))
        .send(data)
        .set('Device-Token', this.token)
        .end(infra.done(callback));
};

Device.prototype.find = function(data, callback) {
    superagent
        .get(infra.tago_api('data'))
        .query(data)
        .set('Device-Token', this.token)
        .end(infra.done(callback));
};

Device.prototype.delete = function(id, callback) {
    if (!callback && typeof id === 'function') {
        callback = id;
        id = null;
    }

    var url = infra.tago_api('data');
    if (id) {
        url += '/' + id;
    }

    superagent
        .del(url)
        .set('Device-Token', this.token)
        .end(infra.done(callback));
};

Device.prototype.update = function(id, data, callback) {
    if (typeof id !== 'string') {
        var _data = data;
        data      = id;
        callback  = _data;
        id        = null;
    }

    var url = infra.tago_api('data');
    if (id) {
        url += '/' + id;
    }

    superagent
        .put(url)
        .send(data)
        .set('Device-Token', this.token)
        .end(infra.done(callback));
};

Device.prototype.listening = function(callback) {
    this.socket = socket(this.token);
    this.socket.on('data', callback);
};

module.exports = Device;
