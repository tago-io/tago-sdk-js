Tago's SDK for JavaScript Documentation
==============================================


#######
Account
#######

In order to modify account, dashboard, bucket, devices and other settings, you can use Account functions to make your life easily.

To setup an account object, you need a token (that you need to get in our website).

.info()
=======
Get all account informations

| **Arguments**
| .info()
|
| **Returns**
| *(Promise)

``` javascript

const Account = require('tago/account');
const myacc   = new Account('/token/');

myacc.info()
    .then((result) => {
        //You can treat the result here
    })
    .catch((error) => {
        //You can treat errors here
    });

```

.tokenList()
============
Get all tokens from the account

| **Arguments**
| .tokenList()
|
| **Returns**
| *(Promise)

``` javascript

const Account = require('tago/account');
const myacc   = new Account('/token/');

myacc.tokenList()
    .then((result) => {
        //You can treat the result here
    })
    .catch((error) => {
        //You can treat errors here
    });

```

.gen_token(/data/)
==================
Generate and retrieve a new token for the account

| **Arguments**
| *data(object) options for the new token.*
|   *\*name*: *a name for the token;*
|   *\*expire_time*: *Time when token should expire. It will be randomly generated if not included.*

| **Returns**
| *(Promise)

``` javascript

const Account = require('tago/account');
const myacc   = new Account('/token/');

myacc.gen_token({"name":"My First Token", "expire_time": New Date()})
    .then((result) => {
        //You can treat the result here
    })
    .catch((error) => {
        //You can treat errors here
    });

```

***************
Inside Function 
***************
After setting up an account object, with your token, it is possible to modify anything inside the account, like devices, buckets and dashboards.

Devices
*******

.info(/id/)
==============
Get informations about the device

| **Arguments**https://www.facebook.com/Duttones/posts/1230828963596165?pnref=story
| *id(string) reference ID of the device.*
|
| **Returns**
| *(Promise)

``` javascript

const Account = require('tago/account');
const myacc   = new Account('/token/').Device;

myacc.info()
    .then((result) => {
        //You can treat the result here
    })
    .catch((error) => {
        //You can treat errors here
    });

```

.. toctree::
   :maxdepth: 2

   Sign up for free! <https://admin.tago.io/signup>
   Forum <https://community.tago.io/>
