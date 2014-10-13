## Tago - Node.JS Lib

Official Lib for use Tago on Node.js

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

var my_device_x = new Tago("device", "MY-DEVICE-TOKEN");

var data_to_insert = {
    variable : 'temperature',
    unit     : 'c',
    value    : 67,
    location : "42.2974279,-85.628292"
};

my_device_x.insert(data_to_insert); // Without callback
// or
my_device_x.insert(data_to_insert, function (err) { // With callback
    if (err) {
        return console.log(err);
    }
    console.log('Added data.');
});
```

## Only for lib developers

#### Run tests
```
$ TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test

for easier you can create a file to run tests, like:

$ echo 'TAGO_TOKEN_DEVICE="c67ad420-5313-11e4-abbc-fb636882321b" TAGO_TOKEN_ACCOUNT="c67ad490-5313-11e4-abbc-fb636874321b" make test' > run_tests.sh
$ chmod +x run_tests.sh
$ ./run_tests.sh
```

## License

Tago lib client for Node.js is released under the [Copyright License](https://github.com/tago-io/tago-nodejs/blob/master/LICENSE.md).