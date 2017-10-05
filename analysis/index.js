'use strict';
const Services = require('./../services/');
const Realtime = require('./../utils/realtime.js');

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
        scon.clear('connect');
        scon.clear('reconnect');
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
        scon.reconnect = () => {
            scon.get_socket.emit('register:analysis', this._token);
        };
        scon.get_socket.on('run:analysis', (scopes) => scopes.forEach(x => this.run(x.environment, x.data, this._token)));
    }
}

module.exports = Analysis;