'use strict';
var Tago = require('../'); // require('tago');


var my_device = new Tago('device', 'a61c4c00-b85b-11e4-b1a6-0f628ad58a3a');

my_device.listening(function (data) {
    console.log(data);

    /* Example output (data)
    {
        bucket: '54e61b5024aaf6cd1d97613x',
        variable: 'speed',
        value: 30,
        time: '2015-03-04T18:33:47.660Z',
        origin: '54e61b6624aaf6cd1d97613f'
    }
    */
});

my_device.socket.on('connect', function () {
    console.log('Connected at Tago.io!');
});

my_device.socket.on('disconnect', function () {
    console.log('Disconnected at Tago.io!');
});
