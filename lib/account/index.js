'use strict';

var superagent = require('superagent');
var socket     = require('../socket.js');
var infra      = require('../infra.js');

function Account (token) {
    this.token = function () {
        if (!token) {
            throw 'Tago Account Token not found, please use before: tago login';
        }
        return token;
    };
}

Account.prototype.login = function(data, callback) {
    superagent
        .post(infra.tago_api('account/token'))
        .send(data)
        .end(infra.done(callback));
};

Account.prototype.listening = function (type) {
    var selfsocket = socket(this.token());

    var active_realtime = function (eventname) {
        selfsocket.on(eventname, function (msg) {
            console.log(msg);
        });
    };

    switch (type) {
        case 'analysis':
            console.log('Anlysis Console Actived');
            active_realtime('console');
            break;
        case 'dashboard':
            console.log('Anlysis Console Actived');
            active_realtime('console');
            break;
        case 'all':
            console.log('Dashboard and Analysis Actived');
            active_realtime('console');
            active_realtime('data');
            break;
    }
};

Account.prototype.update_analysis = function(id, data, callback) {
    superagent
        .put(infra.tago_api('/analyze/' + id))
        .send(data)
        .set('Account-Token', this.token())
        .end(infra.done(callback));
};

Account.prototype.run_analysis = function(id, callback) {
    superagent
        .get(infra.tago_api('/analyze/' + id + '/run'))
        .set('Account-Token', this.token())
        .end(infra.done(callback));
};

module.exports = Account;
