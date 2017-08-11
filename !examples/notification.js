// 'use strict';
// const Account = require('../account');
// const myacc = new Account('250b4030-f519-11e5-8535-970c12895890');

// // myacc.info()
// //     .then(result => console.log(result))
// //     .catch(error => console.error('Error!', error));

// myacc.devices.create({'name':'Teste OpenSource'})
//     .then(result => console.log(result))
//     .catch(result => console.log(result));
process.env.TAGO_API =  'http://api.staging.tago.io';

const Account = require('../account');
const myacc = new Account('5fbee790-7075-11e6-9a4a-a9239fa9b3db');

myacc.notifications.list().then(console.log);
// myacc.notifications.markAsRead(['598dbf22ba30030010c6bf22']).then(console.log);
