'use strict';
const rp = require('request-promise');

module.exports = function tago_request(request_options) {
    return rp(request_options).then(result => {
        if (!result.status) {
            throw result.message || result;
        }
        return result.result;
    });
};