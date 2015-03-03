"use strict";
var Tago         = require("../../");
var assert       = require('assert');
var device_token = process.env.TAGO_TOKEN_DEVICE;

suite('Device - Update', function () {
    suite('Success', function () {
        test('normal', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'variable': 'test',
                'unit'    : 'c',
                'value'   : 1
            };

            device.update('54f681208cfb71885f9c829f', data);
            done();
        });

        test('normal without id', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'variable': 'test',
                'unit'    : 'c',
                'value'   : 1
            };

            device.update(data);
            done();
        });

        test('with callback', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'variable': 'test',
                'unit'    : 'c',
                'value'   : 1
            };

            device.update(data, function (err, result) {
                assert.ok(result.indexOf('Updated id:') !== -1);
                assert.ok(!err);
                done();
            });
        });
    });

    suite('Error', function () {
        test('invalid location', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'location': "xxxx"
            };

            device.update(data, function (err, result) {
                assert.ok(!result);
                assert.equal('Invalid location', err);
                done();
            });
        });
    });
});
