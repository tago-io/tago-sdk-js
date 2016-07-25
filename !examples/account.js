// 'use strict';
// const Account = require('../account');
// const myacc = new Account('250b4030-f519-11e5-8535-970c12895890');

// // myacc.info()
// //     .then(result => console.log(result))
// //     .catch(error => console.error('Error!', error));

// myacc.devices.create({'name':'Teste OpenSource'})
//     .then(result => console.log(result))
//     .catch(result => console.log(result));


'use strict';
const Account = require('../account');
const myacc = new Account('168fd610-dc14-11e5-b427-4b150a362960');

myacc.dashboards.listening('578300a21cfac79f7c9d7da2').then(console.log);