'use strict';
const Device = require('../device');
const mydevice = new Device('079a01a0-2ec4-11e6-a77d-991b8f63b767');

var mydata = [
    {
        variable: 'xx',
        value: 123
    }
];

mydevice.insert(mydata)
    .then(result => console.log('added', result))
    .catch(error => console.error('Error!', error));

mydevice.find({query: 'count'})
    .then(result => console.log('added', result))
    .catch(error => console.error('Error!', error));