const io     = require('socket.io-client');
const config = require('../config.js');

/**
 * TagoIO Socket Connection
 * @param {String} token TagoIO Token
 * @param {JSON} socketIOExtraOptions SocketIO Extra Options
 * @return {io.Socket} SocketIO Instance
 * @description
 * In some cases you will should emit channels to subscribe/unsubscribe
 * exemple:
 *  - socket.emit('attach', 'bucket', '5d30e5f8577736001b1a5e11');
 *  - socket.emit('unattach', 'bucket', '5d30e5f8577736001b1a5e11');
 */
function tagoSocket(token, socketIOExtraOptions = {}) {
  const socket = io.connect(config.realtime_url, {
    ...config.socket_opts,
    query: {
      token,
    },
    ...socketIOExtraOptions,
  });

  return socket;
}

tagoSocket.channels = {
  notification: 'notification::data',
  analysisConsole: 'analysis::console',
  analysisTrigger: 'analysis::trigger',
  bucketData: 'bucket::data',
};

module.exports = tagoSocket;
