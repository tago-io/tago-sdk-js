'use strict';
const axios = require('axios');

module.exports = function service_request(request_options) {
    return new Promise((resolve, reject) => {
        return axios(request_options, function (error, response, body) {

            if (response.statusCode !== 200) {
                return reject('Error on Third-Party service');
            }

            try {
                body = JSON.parse(body);
            } catch (e) {
                return reject('Can\'t parse JSON');
            }

            if (body.status !== 'OK') {
                console.error(body);
                return reject('Error on Third-Party service');
            }

            resolve(body);
        });
    });
};