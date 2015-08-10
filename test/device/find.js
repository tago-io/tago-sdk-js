"use strict";
var Tago         = require("../../");
var assert       = require('assert');
var device_token = process.env.TAGO_TOKEN_DEVICE;

suite('Device - Find', function () {
    test('Success', function (done) {
        var device = new Tago("device", device_token);

        var query = {
            'query': 'last_value'
        };

        device.find(query, function (err, result) {
            assert.ok(result.length > 0);
            assert.ok(!err);
            done();
        });
    });

    test('Error (invalid query)', function (done) {
        var device = new Tago("device", device_token);

        var query = {
            'query': 'xerror'
        };

        device.find(query, function (err, result) {
            assert.equal('Query type not exists', err);
            assert.ok(err);
            assert.ok(!result);
            done();
        });
    });
});
