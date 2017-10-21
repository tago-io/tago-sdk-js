'use strict';
const Device = require('../device');
const mydevice = new Device('369ed0e1-38af-49be-a3bb-2b9c5e4be658');

var mydata = [
  {
    variable: 'xx',
    value: 123
  }
];

mydevice.insert(mydata)
  .then(result => console.log('added', result))
  .catch(error => console.error('Error!', error));

