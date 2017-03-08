'use strict';
const axios = require('axios');

module.exports = function tago_request(request_options) {
    return axios(request_options).then(result => {
        if (!result.data) {
            throw result.statusText;
        }
        else if (request_options.url.indexOf('/data/export') !== -1) {
            return result.data;
        }
        else if (!result.data.status) {
            throw result.data.message || result;
        }
        return result.data.result;
    });
};
