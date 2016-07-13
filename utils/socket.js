'use strict';

const socketclient = require('socket.io-client');
const config       = require('../config.js');
const options = {
    'reconnectionDelay': 10000,
    'reconnection': true,
    'transports': ['websocket']
};

class SocketConnect {
    constructor(token) {
        if (!token) throw 'Needs a token';
        this.token = token;

        this.socket = socketclient(config.realtime_url, options);
        this.socket.on('connect', () => {
            this.socket.emit('register', this.token);
        });

        this.socket.on('reconnecting', () => console.log('Trying to reestablish connection.'));
        this.socket.on('disconnect', () => {
            console.log('Disconnected from Tago.io.');
        });
    }

    set disconnect(func) {
        this.socket.off('disconnect');
        this.socket.on('disconnect', func);
    }
    set connect(func) {
        this.socket.off('connect');
        this.socket.on('connect', func);
    }
    set reconnect(func) {
        this.socket.off('reconnecting');
        this.socket.on('reconnecting', func);
    }
    set connect_timeout(func) {
        this.socket.off('connect_timeout');
        this.socket.on('connect_timeout', func);
    }
    set register(func) {
        this.socket.off('register');
        this.socket.on('register', func);
    }
    set error(func) {
        this.socket.off('error');
        this.socket.on('error', func);
    }
    
    /** Start listening the analysis
     * @param  {function} function to call when socket is triggered
     */
    listen_analysis(func) {
        this.connect = () => {
            console.log('Connected on Tago.io.');
            this.socket.emit('register:analysis', this.token);
            this.socket.on('register:analysis', (result) => {
                if (!result.status) {
                    return console.log(result.result);
                } else {
                    console.log(result.result);
                }
            });
        };
        this.socket.on('run:analysis', func);
    }

    /** Start listening the dashboard
     * @param  {string} id id of the dashboard to start to listen
     * @param  {function} function to call when socket is triggered
     */
    listen_dashboard(id, func) {
        this.socket.on('dashboard:'+id, func);
    }

    /** Start listening the device
     * @param  {function} function to call when socket is triggered
     */
    listen_device(func) {
        this.socket.on('data', func);
    }

    /** Stop to listen the analysis
     */
    stop_analysis() {
        this.socket.off('run:analysis');
    }

    /** Stop to listen the dashboard by its ID
     * @param  {string} id id of the dashboard to stop to listen
     */
    stop_dashboard(id) {
        this.socket.off('dashboard:'+id);
    }

    /** Stop to listen the device
     */
    stop_device() {
        this.socket.off('data');
    }
    
    /**
     * Get all methods for the Socket Connection
     * You can set the method by using:
     * > socket.disconnect = function
     */
    get methods() {
        return {
            'disconnect':      this.disconnect,
            'connect':         this.connect,
            'reconnect':       this.reconnecting,
            'register':        this.register,
            'error':           this.error,
            'connect_timeout': this.connect_timeout,
        };
    }
}

module.exports = SocketConnect;