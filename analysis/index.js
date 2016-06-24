'use strict';
const socketio = require('socket.io-client');
const config = require('./../config.js');
const Services = require('./../services/');

class Analysis {
    constructor(analysis, token) {
        this._token = token;
        this._analysis = analysis;

        if (!process.env.TAGO_RUNTIME) {
            this.local_runtime();
        }
    }

    run(environment, data, token) {
        let scope = {
            'environment': environment,
            'data': data,
            'services': new Services(token)
        };
        this._analysis(scope);
    }

    local_runtime() {
        if (!this._token) {
            throw 'To run locally, needs a token.';
        }
        const scon = socketio(config.realtime_uri);
        scon.on('connect', () => {
            console.log('Connected on Tago.io.');
            scon.emit('register:analysis', this._token);
            scon.on('register:analysis', (result) => {
                if (!result.status) {
                    return console.log(result.result);
                } else {
                    console.log(result.result);
                }
            });
        });
        scon.on('disconnect', () => {
            console.log('Disconnected from Tago.io.');
            scon.off('register:analysis');
        });
        scon.on('reconnecting', () => console.log('Trying to reestablish connection.'));
        scon.on('run:analysis', (scopes) => scopes.forEach(x => this.run(x.environment, x.data, this._token)));
    }
}

module.exports = Analysis;