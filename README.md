## Tago - Node.JS Lib

Official Node.js lib for Tago

## Code Status

[![wercker status](https://app.wercker.com/status/7eba1fa5503f7f5ad61a15a0a6e63234/m "wercker status")](https://app.wercker.com/project/bykey/7eba1fa5503f7f5ad61a15a0a6e63234)

## Documentation

#### Installation

```
$ npm install tago --save
```
#### Usage
##### Insert Data
``` javascript
var Tago = require('tago');

var my_device_token = 'add your device token here';
var my_device       = new Tago('device', my_device_token);

var data_to_insert = {
    'variable' : 'temperature',
    'location' : '42.2974279,-85.628292',
    'time'     : '2014-01-20 03:43:59',
    'unit'     : 'C',
    'value'    : 63
};

my_device.insert(data_to_insert); // Without callback
// or
my_device.insert(data_to_insert, function (err) { // With callback
    if (err) {
        return console.log(err);
    }
    console.log('Data added');
});
```

## Only for lib developers

#### Run tests
```
$ TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test

We recommend to build a simple script to run tests. One example is given below.

$ echo 'TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test' > run_tests.sh
$ chmod +x run_tests.sh
$ ./run_tests.sh
```

## License

Tago lib client for Node.js is released under the [Copyright License](https://github.com/tago-io/tago-nodejs/blob/master/LICENSE.md).