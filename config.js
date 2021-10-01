
module.exports = {
  api_url: process.env.TAGOIO_API || 'https://api.tago.io',
  realtime_url: process.env.TAGOIO_REALTIME || 'wss://realtime.tago.io',
  request_attempts: process.env.REQUEST_ATTEMPTS || 5,
  request_timeout: 60000,
  socket_opts: {
    reconnectionDelay: 10000,
    reconnection: true,
    transports: ['websocket'],
  },
};
