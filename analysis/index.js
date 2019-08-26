const Services = require('../services/');
const tagoSocket = require('../comum/tago_socket');

function stringify_msg(msg) {
  return (typeof msg === 'object' && !Array.isArray(msg) ? JSON.stringify(msg) : String(msg));
}

class Analysis {
  constructor(analysis, token) {
    this._token    = token;
    this._analysis = analysis;

    if (!process.env.TAGO_RUNTIME) {
      this.localRuntime();
    }
  }

  run(environment, data, analysis_id, token) {
    const tago_console = new Services(token).console;
    function log(...args) {
      if (!process.env.TAGO_RUNTIME) console.log(...args);
      return tago_console.log(Object.keys(args).map((x) => stringify_msg(args[x])).join(' '));
    }

    const context = {
      log,
      token,
      environment,
      analysis_id,
    };
    this._analysis(context, data || []);
  }

  localRuntime() {
    if (!this._token) {
      throw 'To run locally, needs a token.';
    }

    const socket = tagoSocket(this._token);

    socket.on('connect', () => console.info('Connected to TagoIO.'));
    socket.on('disconnect', () => console.info('Disconnected from TagoIO.\n\n'));
    socket.on('error', (e) => console.error('Connection error', e));
    socket.on('ready', (analysis) => console.info(`Analysis [${analysis.name}] Started.`));
    socket.on(tagoSocket.channels.analysisTrigger, (scope) => {
      this.run(scope.environment, scope.data, scope.analysis_id, scope.token);
    });
  }
}

module.exports = Analysis;
