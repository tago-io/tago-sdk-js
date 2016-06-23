'use strict';
const Account = require('tago/account');
const myacc = new Account('000f0800-fc4b-11e5-b15e-f77cdcbbb0e4');

// myacc.info()
//     .then(result => console.log(result))
//     .catch(error => console.error('Error!', error));

myacc.devices.create({'name':'Teste OpenSource'})
    .then(result => console.log(result))
    .catch(result => console.log(result));
