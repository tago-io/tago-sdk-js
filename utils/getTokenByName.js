/**
 * Get a token of a device by its name
 * @param  {account} account account object from tago
 * @param  {string} device_id id of the device
 * @param  {string|array} name name of the token, if null will return the first token found
 * @return {Promise<String>} token
 */
async function getTokenByName(account, device_id, names = null) {
  const tokens = await account.devices.tokenList(device_id);
  if (!tokens || !tokens[0]) return;

  let token;
  if (names) {
    names = Array.isArray(names) ? names : [names];
    for (const name of names) {
      token = tokens.find((t) => t.name.indexOf(name) >= 0);
      if (token) break;
    }
  } else {
    token = tokens[0];
  }

  if (!token) throw `Can't find Token for ${device_id} in ${names}`;
  return token.token;
}

module.exports = getTokenByName;
