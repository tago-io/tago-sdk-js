'use strict';
const Services = require('./../services/');
const Realtime = require('../realtime');

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

  run(environment, data, token) {
    let tago_console = new Services(token).console;
    function log() {
      if (!process.env.TAGO_RUNTIME) console.log.apply(null, arguments);
      return tago_console.log(Object.keys(arguments).map(x => stringify_msg(arguments[x])).join(' '));
    }

    let context = {
      log,
      token,
      environment
    };
    this._analysis(context, data || []);
  }

  localRuntime() {
    if (!this._token) {
      throw 'To run locally, needs a token.';
    }
    const scon = new Realtime(this._token);
    scon.onConnect = () => console.log('Connected to Tago.');
    scon.onDisconnect = () => console.log('Disconnected from Tago.');
    scon.onError = (e) => console.error(e);

    scon.connect().then(() => {
      scon.listening('run:analysis', (scope) => {
        this.run(scope.environment, scope.data, this._token);
      });
    }).catch(console.error);
  }
}

module.exports = Analysis;
