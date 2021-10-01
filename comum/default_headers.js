
const pkg = require('../package.json');

// Check if env is on browser.
let isBrowser = false;
try {
    isBrowser = window !== undefined; // eslint-disable-line
} catch (e) { /* ignore */ }

/** default_headers
 * Generate default headers
 * @private
 * @return {JSON}
 */
function default_headers(class_context) {
  class_context = class_context || {};
  const headers   = {};

  if (class_context.token) {
    headers.Token = class_context.token;
  }

  if (!isBrowser && typeof process !== "undefined") {
    const banner = !process.env.T_ANALYSIS_CONTEXT === 'tago-io' ? `(Running at TagoIO)` : `(External; Node.js/${process.version} ${process.platform}/${process.arch})`;
    headers['User-Agent'] = `TagoIO-SDK|JS|${pkg.version}-Deprecated ${banner}`;
  }

  return headers;
}

module.exports = default_headers;
