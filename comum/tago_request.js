'use strict';
const axios = require('axios');
const co    = require('co');
const config = require('../config');

function resultHandler(request_options, result) {
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
}

function errorHandler(error) {
    if (!error.response.data) {
        throw error;
    }
    const { message, status, result } = error.response.data;
    if (message.includes(['Timeout']) || message.includes(['SequelizeDatabaseError'])) {
        return false;
    }
    else if (!status) {
        throw message || error;
    }
    throw result;
}

const waitTime = () => new Promise(resolve => setTimeout(() => resolve(), 1000));

module.exports = function tago_request(request_options) {
    return co(function* _() {
        request_options.timeout = 60000;
        let result;
        const _resultHandler = resultHandler.bind(null, request_options);
        for (let i = 1; i <= config.request_attempts; i+=1) {
            result = yield axios(request_options).then(_resultHandler, errorHandler);
            if (result) continue;
            
            yield waitTime();
        }
        if (!result) result = 'SDK: Request timed out';
        return result;
    });
};
