[![NPM](https://nodei.co/npm/tago.png?downloads=true&downloadRank=true)](https://nodei.co/npm/tago/)
[![NPM](https://nodei.co/npm-dl/tago.png?months=6&height=3)](https://nodei.co/npm/tago/)

[![Documentation Status](https://readthedocs.org/projects/tago-sdk-js-documentation/badge/?version=latest)](http://tago-sdk-js-documentation.readthedocs.io/en/latest/?badge=latest)
[![Dependency Status](https://david-dm.org/tago-io/tago-sdk-js.svg)](https://david-dm.org/tago-io/tago-sdk-js)
[![npm version](https://badge.fury.io/js/tago.svg?style=flat)](http://badge.fury.io/js/tago)

# Description

Tago SDK for JavaScript in the browser and Node.js.

| what                  | where                    |
|-----------------------|--------------------------|
| Tago website          | http://tago.io           |
| SDK documentation     | http://sdk.js.tago.io    |
| General documentation | http://docs.tago.io      |
| Slack / Community     | http://community.tago.io |

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

Tago SDK for JavaScript in the browser and Node.js is released under the [Apache-2.0 License](https://github.com/tago-io/tago-sdk-js/blob/master/LICENSE.md).
