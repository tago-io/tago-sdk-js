'use strict';
const config = require('../config.js');

/** default_headers
 * Generate default headers
 * @private
 * @return {JSON}
 */
function default_headers(class_context) {
    return {
        'Token': class_context.token,
        'User-Agent': `Tago-Nodelib-${config.version}`
    };
}

module.exports = default_headers;