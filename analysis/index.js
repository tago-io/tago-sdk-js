'use strict';
const Services = require('./../services/');
const Realtime = require('./../utils/realtime.js');
 
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
        function log(...args) {
            if (!process.env.TAGO_RUNTIME) console.log.apply(null, args);
            return tago_console.log(args);
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
            scon.get_socket.emit('register:analysis', this._token);
            scon.get_socket.on('register:analysis', (result) => {
                if (!result.status) {
                    return console.log(result.result);
                } else {
                    console.log(result.result);
                }
            });
        };
        scon.get_socket.on('run:analysis', (scopes) => scopes.forEach(x => this.run(x.environment, x.data, this._token)));
    }
}

module.exports = Analysis;