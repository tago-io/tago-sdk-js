// 'use strict';
// const Account = require('../account');
// const myacc = new Account('250b4030-f519-11e5-8535-970c12895890');

// // myacc.info()
// //     .then(result => console.log(result))
// //     .catch(error => console.error('Error!', error));

// myacc.devices.create({'name':'Teste OpenSource'})
//     .then(result => console.log(result))
//     .catch(result => console.log(result));



const Account = require('../account');
const myacc = new Account('b609a400-d8ee-11e6-a756-7b141ff86390');

myacc.profileDelete('58790a9b63fdfd0cc1accac9').then(console.log);
