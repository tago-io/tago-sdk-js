"use strict";

exports.done = function done(callback) {
    if (typeof callback !== 'function') { callback = function () { return; }; }

    return function (err, res) {
        if (err) {
            return callback(err);
        }

        if (res.body.status === true) {
            return callback(null, res.body.result);
        }

        if (res.body.status === false) {
            return callback(res.body.result);
        }

        callback(res.error);
    };
};

exports.tago_api = function tago_api(uri) {
    return (process.env.TAGO_SERVER || "https://api.tago.io/v0/") + uri;
};