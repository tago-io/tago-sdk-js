'use strict';
const pkg    = require('../package.json');
/** default_headers
 * Generate default headers
 * @private
 * @return {JSON}
 */
function default_headers(class_context) {
    return {
        'Token': class_context.token,
        'User-Agent': `Tago-Nodelib-${pkg.version}`
    };
}

module.exports = default_headers;
