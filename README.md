## Tago - SDK for JavaScript
[![wercker status](https://app.wercker.com/status/7eba1fa5503f7f5ad61a15a0a6e63234/s/master "wercker status")](https://app.wercker.com/project/bykey/7eba1fa5503f7f5ad61a15a0a6e63234)
[![Documentation Status](https://readthedocs.org/projects/tago-sdk-js-documentation/badge/?version=latest)](http://tago-sdk-js-documentation.readthedocs.io/en/latest/?badge=latest)

[Documentation Link](http://sdk.js.tago.io/)

#### Installation

NODE >= v4.4
```
$ npm install tago --save
```

NODE < v4.4
```
$ npm install tago@1.* --save
```

#### Usage
##### Insert Data
**.insert(JSON || Array);**
``` javascript
const Device = require('tago/device');
const mydevice = new Device('079a01a0-2ec4-11e6-a77d-991b8f63b767');

let data_to_insert = {
    'variable' : 'temperature',
    'location' : {'lat': 42.2974279, 'lng': -85.628292},
    'time'     : '2014-01-20 03:43:59',
    'unit'     : 'C',
    'value'    : 63
};

my_device.insert(data_to_insert)
    .then(api_response => {
        console.log('Data added');
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## License

Tago SDK for JavaScript in the browser and Node.js is released under the [Apache-2.0 License](https://github.com/tago-io/tago-nodejs/blob/master/LICENSE.md).