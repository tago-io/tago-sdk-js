'use strict';
module.exports = {
    'api_url'     : process.env.TAGO_API || 'https://api.tago.io',
    'realtime_url': process.env.TAGO_REALTIME || 'wss://realtime.tago.io',
    'request_attempts': process.env.REQUEST_ATTEMPTS || 3,
};
