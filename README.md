# TagoIO - SDK for Node.js
> (Deprecated - Support until 2030-07-20)

> Use @tago-io/sdk instead. https://github.com/tago-io/sdk-js

TagoIO SDK for JavaScript in the browser and Node.JS.

| what                  | where                                     |
|-----------------------|-------------------------------------------|
| TagoIO website        | https://tago.io                           |
| SDK documentation     | http://tago-sdk-js-documentation.rtfd.io/ |
| General documentation | https://docs.tago.io                      |

# Installation

```bash
$ npm install tago --save
```

# Quick Example
## Insert Device Data
``` javascript
const Device = require('tago/device');
const mydevice = new Device('079a01a0-2ec4-11e6-a77d-991b8f63b767');

const myData = {
  'variable' : 'temperature',
  'location' : {'lat': 42.2974279, 'lng': -85.628292},
  'time'     : '2014-01-20 03:43:59',
  'unit'     : 'C',
  'value'    : 63
};

async function insertData() {
  const result = await my_device.insert(myData);
  console.log(result); // 1 Data Added
}

insertData();

// -> See full documentation at: http://sdk.js.tago.io/
```

# License

TagoIO SDK for JavaScript in the browser and Node.js is released under the [Apache-2.0 License](https://github.com/tago-io/tago-sdk-js/blob/master/LICENSE.md).
