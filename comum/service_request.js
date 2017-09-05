'use strict';
const axios = require('axios');

module.exports = function service_request(request_options) {
    request_options.timeout = 60000;

    return new Promise((resolve, reject) => {
        axios(request_options).then((result) => {
            if (result.status !== 200) {
                return reject('Error on Third-Party service');
            }
            let body = result.data;
            try {
                body = JSON.parse(body);
            } catch (e) {
                // return reject('Can\'t parse JSON');
            }

            if (result.statusText !== 'OK') {
                console.error(body);
                return reject('Error on Third-Party service');
            }

            resolve(body);
        });
    });
};