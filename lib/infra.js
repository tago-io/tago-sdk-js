"use strict";

exports.done = function done(callback) {
    if (typeof callback !== 'function') { callback = function () { return; }; }

    return function (err, res) {
        if (err) {
            return callback({
                "message": "Connection error",
                "code": err.code
            });
        }

        if (String(res.status).indexOf("4") === 0 || String(res.status).indexOf("5") === 0) {
            return callback({
                "message": "Connection error",
                "code": res.status
            });
        }

        if (res.body.status === true) {
            return callback(null, res.body.result);
        }

        if (res.body.status === false) {
            console.log(res.body);
            return callback(res.body.message);
        }

        callback(res.error);
    };
};

exports.tago_api = function tago_api(uri) {
    return (process.env.TAGO_SERVER || "https://api.tago.io/") + uri;
};

exports.tago_realtime = process.env.TAGO_REALTIME || "wss://realtime.tago.io";
