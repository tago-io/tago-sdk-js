"use strict";
var Tago         = require("../../");
var assert       = require('assert');
var device_token = process.env.TAGO_TOKEN_DEVICE;

suite('Device - Delete', function () {
    suite('Success', function () {
        test('normal without id', function (done) {
            var device = new Tago("device", device_token);

            device.delete(function (err) {
                assert.ok(!err);
                done();
            });
        });
    });

    suite('Error', function () {
        test('invalid ID', function (done) {
            var device = new Tago("device", device_token);

            device.delete('xxxerrorID', function (err, result) {
                assert.ok(!result);
                assert.equal('Not found any data for delete', err);
                done();
            });
        });
    });
});
