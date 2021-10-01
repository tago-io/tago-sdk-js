const Services = require('../services/');
const tagoSocket = require('../comum/tago_socket');
const JSONParseSafe = require('../comum/JSONParseSafe');

function stringify_msg(msg) {
  return (typeof msg === 'object' && !Array.isArray(msg) ? JSON.stringify(msg) : String(msg));
}

class Analysis {
  constructor(analysis, token) {
    this._token    = token;
    this._analysis = analysis;

    if (!process.env.T_ANALYSIS_CONTEXT) {
      this.localRuntime();
    } else {
      this.runOnTagoIO();
    }
  }

  runOnTagoIO() {
    if (!this._analysis || typeof this._analysis !== "function") {
      throw "Invalid analysis function";
    }

    const context = {
      log: console.log,
      token: process.env.T_ANALYSIS_TOKEN,
      environment: JSONParseSafe(process.env.T_ANALYSIS_ENV, []),
      analysis_id: process.env.T_ANALYSIS_ID,
    };

    const data = JSONParseSafe(process.env.T_ANALYSIS_DATA, []);

    this._analysis(context, data);
  }

  runLocal(environment, data, analysis_id, token) {
    if (!this._analysis || typeof this._analysis !== 'function') {
      throw 'Invalid analysis function';
    }

    const tago_console = new Services(token).console;

    function log(...args) {
      if (!process.env.T_ANALYSIS_AUTO_RUN) {
        console.log(...args);
      }

      return tago_console.log(Object.keys(args).map((x) => stringify_msg(args[x])).join(' '));
    }

    const context = {
      log,
      token,
      environment,
      analysis_id,
    };

    if (this._analysis.constructor.name === 'AsyncFunction') {
      this._analysis(context, data || []).catch(log);
    } else {
      try {
        this._analysis(context, data || []);
      } catch (error) {
        log(error);
      }
    }
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
      this.runLocal(scope.environment, scope.data, scope.analysis_id, scope.token);
    });
  }

  static use(analysis, token) {
    return new Analysis(analysis, token);
  }
}

module.exports = Analysis;
