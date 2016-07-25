'use strict';
const Services = require('./../services/');
const Realtime = require('./../services/realtime.js');
 
class Analysis {
    constructor(analysis, token) {
        this._token    = token;
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
        const scon = new Realtime(this._token);
        scon.connect = () => {
            console.log('Connected on Tago.io.');
            scon.emit('register:analysis', this._token);
            scon.on('register:analysis', (result) => {
                if (!result.status) {
                    return console.log(result.result);
                } else {
                    console.log(result.result);
                }
            });
        };
        scon.on('run:analysis', (scopes) => scopes.forEach(x => this.run(x.environment, x.data, this._token)));
    }
}

module.exports = Analysis;