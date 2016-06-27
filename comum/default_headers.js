'use strict';
const pkg    = require('../package.json');
const isBrowser = this.window !== undefined;

/** default_headers
 * Generate default headers
 * @private
 * @return {JSON}
 */
function default_headers(class_context) {
    let headers = {};
    headers.Token = class_context.token;
    
    if (!isBrowser) {
        headers['User-Agent'] = `Tago-Nodelib-${pkg.version}`;
    }

    return headers;
}

module.exports = default_headers;
