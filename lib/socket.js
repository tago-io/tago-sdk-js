'use strict';

var socketclient = require('socket.io-client');
var infra        = require('./infra.js');

module.exports = function (token) {
    var options = {
        "reconnectionDelay": 10000,
        "reconnection": true
    };

    var socket = socketclient(infra.tago_realtime, options);

    socket.on('connect', function () {
        socket.emit('register', token);
    });

    return socket;
};
