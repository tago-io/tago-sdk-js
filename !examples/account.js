'use strict';
process.env.TAGO_API = 'http://localhost:3000/';
const Account = require('../account');
const myacc = new Account('bc2072bf-8ae3-4c9c-8b50-88b7fbb2487d');

myacc.auditlog().then(console.log);
// myacc.info()
//   .then(result => console.log(result))
//   .catch(error => console.error('Error!', error));
