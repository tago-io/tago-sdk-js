'use strict';
const Services = require('./../services/');
const Socket   = require('./../utils/').socket;

class Analysis {
    constructor(analysis, token) {
        this._token = token;
        this._analysis = analysis;

        if (!process.env.TAGO_RUNTIME) {
            this.local_runtime();
        }
    }

    run(environment, data, token) {
        let tago_console = new Services(token).console;
        function log(message) {
            return tago_console.log(message);
        }

        let context = {
            log,
            token,
            environment
        };
        this._analysis(context, data || []);
    }

    local_runtime() {
        if (!this._token) {
            throw 'To run locally, needs a token.';
        }
        const scon = new Socket(this._token);
        scon.listen_analysis((scopes) => scopes.forEach(x => this.run(x.environment, x.data, this._token)));
    }
}

module.exports = Analysis;