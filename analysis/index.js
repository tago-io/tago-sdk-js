'use strict';
const socketio = require('socket.io-client');
const config = require('./../config.js');
const Services = require('./../services/');

class Analysis {
    constructor(analysis, token = null) {
        const ambient = this.check_ambient();

        if (ambient === 'tago-server') {
            analysis(this.data, this.env);
        }

        if (ambient === 'local') {
            this.local_analysis(analysis, token);
        }
    }

    check_ambient() {
        if (process.env.TAGO_DATA || process.env.TAGO_ENV) {
            this.data = process.env.TAGO_DATA || [];
            this.env  = process.env.TAGO_ENV || {};
            return 'tago-server';
        }
        return 'local';
    }

    local_analysis(analysis, token) {
        if (!token) {
            throw 'To run locally, needs a token.';
        }
        const scon = socketio(config.realtime_uri);
        scon.on('connect', () => {
            console.log('Connected on Tago.io.');
            scon.emit('register:analysis', token);
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
        scon.on('reconnecting', () => {
            console.log('Trying to reestablish connection.');
        });
        scon.on('run:analysis', (scopes = []) => {
            scopes.forEach(x => {
                let scope = {
                    'environment': x.environment,
                    'data': x.data,
                    'services': new Services(token)
                };
                analysis(scope);
            });
        });
    }
}

module.exports = Analysis;