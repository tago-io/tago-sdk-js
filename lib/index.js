"use strict";
var types = {
    'account': require('./account/'),
    'device' : require('./device/')
};

function Tago (type, token) {
    if (!types[type]) {
        throw "You can use, 'account' or 'device', the method " + type + " not exists.";
    }

    return new types[type](token);
}

module.exports = Tago;
