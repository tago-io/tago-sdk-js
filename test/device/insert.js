"use strict";
var Tago         = require("../../");
var assert       = require('assert');
var device_token = process.env.TAGO_TOKEN_DEVICE;

suite('Device - Insert', function () {
    suite('Success', function () {
        test('normal', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'variable': 'test',
                'unit'    : 'c',
                'value'   : 1
            };

            device.insert(data);
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

            device.insert(data, function (err, result) {
                assert.ok(!err);
                assert.equal('Added', result);
                done();
            });
        });
    });

    suite('Error', function () {
        test('invalid variable', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'unit'    : 'c',
                'value'   : 1
            };

            device.insert(data, function (err, result) {
                assert.ok(!result);
                assert.equal('Invalid variable', err);
                done();
            });
        });

        test('invalid location', function (done) {
            var device, data;

            device = new Tago("device", device_token);
            data = {
                'variable': 'x',
                'unit'    : 'c',
                'value'   : 1,
                'location': "xxxx"
            };

            device.insert(data, function (err, result) {
                assert.ok(!result);
                assert.equal('Invalid location', err);
                done();
            });
        });
    });
});