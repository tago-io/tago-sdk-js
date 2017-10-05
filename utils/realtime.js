'use strict';

const socketclient = require('socket.io-client');
const config       = require('../config.js');
const options = {
    'reconnectionDelay': 10000,
    'reconnection': true
    // 'transports': ['websocket']
};

/**
 * Create a realtime object to connect with Tago
 * .Clear(/event/) - Erase an default event.
 */
class Realtime {
    constructor(token) {
        if (!token) throw 'Needs a token';
        this.token = token;

        this.socket = socketclient(config.realtime_url, options);
        this.socket.once('connect', () => {
            this.socket.emit('register', this.token);
        });

        this.socket.on('reconnecting', () => console.log('Trying to reestablish connection.'));
        this.socket.on('disconnect', () => {
            console.log('Disconnected from Tago.io.');
        });
        this.socket.on('reconnect', () => this.socket.emit('register', this.token));
        this.socket.on('reconnect_error', () => console.log('Failed to reestablish connection.'));
    }
    clear(event) {
        this.socket.off(event);
    }
    set disconnect(func) {
        this.socket.on('disconnect', func);
    }
    set connect(func) {
        this.socket.once('connect', func);
    }
    set reconnect(func) {
        this.socket.on('reconnect', func);
    }
    set reconnecting(func) {
        this.socket.on('reconnecting', func);
    }
    set connect_timeout(func) {
        this.socket.on('connect_timeout', func);
    }
    set register(func) {
        this.socket.on('register', func);
    }
    set error(func) {
        this.socket.on('error', func);
    }
    get get_socket() {
        return this.socket;
    }
    
    /**
     * Get all methods for the Socket Connection
     * You can set the method by using:
     * > socket.disconnect = function
     */
    get methods() {
        return {
            'disconnect':      this.disconnect,
            'clear':           this.clear,
            'connect':         this.connect,
            'reconnect':       this.reconnecting,
            'register':        this.register,
            'error':           this.error,
            'connect_timeout': this.connect_timeout,
        };
    }
}

module.exports = Realtime;