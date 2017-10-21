'use strict';
const co = require('co');

/**
 * Get a token of a device by its name
 * @param  {account} account account object from tago
 * @param  {string} device_id id of the device 
 * @param  {string|array} name name of the token, if null will return the first token found
 * @return {String} token
 */
function getTokenByName(account, device_id, names = null) {
  return co(function*() {
    const tokens = yield account.devices.tokenList(device_id);
    if (!tokens || !tokens[0]) return;

    let token;
    if (names) {
      names = Array.isArray(names) ? names : [names];
      for (const name of names) {
        token = tokens.find((token) => token.name.indexOf(name) >= 0);
        if (token) return;
      }
    } else {
      token = tokens[0];
    }

    if (!token) throw `Can't find Token for ${device_id} in ${names}`;
    return token.token;
  }).catch((error) => { throw error; });
}

module.exports = getTokenByName;
