"use strict";
var infra         = require("../../lib/infra.js");
var assert       = require('assert');

suite("Infra", function () {
    test("Connection error - server not found", function (done) {

        var cb = infra.done(function (err, result) {
            assert.equal("ECONNREFUSED", err.code);
            assert.ok(!result);
            done();
        });

        cb({"code": "ECONNREFUSED"});
    });

    test("Connection error - 404", function (done) {

        var cb = infra.done(function (err, result) {
            assert.equal("404", err.code);
            assert.ok(!result);
            done();
        });

        cb(null, {"status": 404});
    });

    test("Connection error - 500", function (done) {

        var cb = infra.done(function (err, result) {
            assert.equal("500", err.code);
            assert.ok(!result);
            done();
        });

        cb(null, {"status": 500});
    });

    test("Success", function (done) {

        var cb = infra.done(function (err, result) {
            assert.equal("Test", result);
            assert.ok(!err);
            done();
        });

        cb(null, {"status": 200, "body": {"status": true, "result": "Test"}});
    });
});
