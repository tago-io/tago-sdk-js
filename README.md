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
**.insert(JSON, /CALLBACK/);**
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

##### Delete Data
**.delete(/ID/, /CALLBACK/);**
``` javascript

my_device.delete('Data_ID'); // Without callback
// or
my_device.delete(); // Without callback and ID (We will delete last record)
// or
my_device.delete('Data_ID', function (err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result);
});

```

##### Update Data
**.update(/ID/, JSON, /CALLBACK/);**
``` javascript

var object_to_update = {
    'value': 32
};

my_device.update('Data_ID', object_to_update); // Without callback
// or
my_device.update(object_to_update); // Without callback and ID (We will update last record)
// or
my_device.update('Data_ID', object_to_update, function (err, result) {
    if (err) {
        return console.error(err);
    }
    console.log(result);
});

```

##### Listening new data by Socket
**.listening(CALLBACK);**

When arrive new data in Tago.io we will send to your device, so you need configure this in **Action** (Menu on Admin) create a new **action** and select the option **Send to Device**. All device using the token with bucket associated will receive the data.

``` javascript

my_device.listening(function (data_from_tago) {
    console.log(data_from_tago);
});


// If you wanna add listening to connect, you can access socket instance direct using 'mydevice.socket.on', see example below:

my_device.socket.on('connect', function () {
    console.log('Connected at Tago.io!');
});

my_device.socket.on('disconnect', function () {
    console.log('Disconnected at Tago.io!');
});

```

## Below only for lib developers

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
