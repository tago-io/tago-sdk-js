#######
Account
#######
In order to modify account, dashboard, bucket, devices and other settings, its necessary to use the device functions.

To setup an account object, you need a token (that you need to get in our website). Make sure to use tokens with correct write/read previlegies for the currenct function you want to use. For example, token with only read previlegies can't create, modify or delete anything from an account.

.info
*******
Get all account informations

| **Syntax**
| *.info()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myacc   = new Account('0e479db0-tag0-11e6-8888-790d555b633a');

    myacc.info()
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.tokenList
************
Get all tokens from the account

| **Syntax**
| *.tokenList()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myacc   = new Account('0e479db0-tag0-11e6-8888-790d555b633a');

    myacc.tokenList()
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.gen_token
******************
Generate and retrieve a new token for the account

| **Syntax**
| *.gen_token()*
|
| **Arguments**
| *data(object) options for the new token.*
|   *\*name(string)*: *a name for the token;*
|   *\*expire_time(string)*: *Time when token should expire. It will be randomly generated if not included.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myacc   = new Account('0e479db0-tag0-11e6-8888-790d555b633a');

    myacc.gen_token({"name":"My First Token", "expire_time": New Date()})
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

Devices
*******
Across the account function, it is possible to manage all your devices. Be sure to use an account token with "write" permissions when using functions like create, edit and delete. The Device method is completly different from the class Device, since this one can only manage devices, and can't do anything with data related to the device.

.list
=====
Retrieve a list with all devices from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdevices   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    
    accdevices.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new device for the account

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new device.*
|   *\*name(string)*: *a name for the device;*
|   *\*description(string)*: *description for the device. (optional)*
|   *\*active(bool)*: *Set if the device will be active or not. Default True. (optional)*
|   *\*visible(bool)*: *Set if the device will be visible or not. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*token*: *token for the generated device;*
|   *\*id*: *id of the new device;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdevices   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    var data = {
        "name":"My first device",
        "description":"Creating my first device",
        "active":true,
        "visible":true,
        "tags": [
            {"key": "client", "value": "Francisco"}
        ]
    };

    accdevices.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=====
Modify any property of the device.

| **Syntax**
| *.edit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the device.*
| *data(object) options to be modified in the device.*
|   *\*name(string)*: *a name for the device; (optional)*
|   *\*description(string)*: *description for the device. (optional)*
|   *\*active(bool)*: *Set if the device will be active or not. Default True. (optional)*
|   *\*visible(bool)*: *Set if the device will be visible or not. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    var data = {
        "name":"New name for my device",
        "description":"This way I can change the description too",
        "active":false,
        "visible":true,
        "tags": [
            {"key": "client", "value": "Leonardo"}
        ]
    };

    accdevices.edit('576dc932415f403531fd2cf6', data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get informations about the device

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the device.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    
    accdevices.info('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.tokenList
==========
Retrieve a list of all tokens of the device

| **Syntax**
| *.tokenList(/id/)*
|
| **Arguments**
| *id(string) reference ID of the device.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    
    accdevices.tokenList('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete device for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the device.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Devices;
    
    accdevices.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

Buckets
*******
Across the account function, it is possible to manage all your buckets. Be sure to use an account token with "write" permissions when using functions like create, edit and delete. The bucket method is completly different from the class bucket, since this one can only manage buckets, and can't do anything with data related to the bucket.

.list
========
Retrieve a list with all buckets from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accbuckets   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Buckets;
    
    accbuckets.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new bucket for the account

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new bucket.*
|   *\*name(string)*: *a name for the bucket;*
|   *\*description(string)*: *description for the bucket. (optional)*
|   *\*visible(bool)*: *Set if the bucket will be visible or not. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*id*: *id of the new bucket;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accbuckets   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Buckets;
    var data = {
        "name":"My first bucket",
        "description":"Creating my first bucket",
        "visible":true,
        "tags": [
            {"key": "client", "value": "Francisco"}
        ]
    };

    accbuckets.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
===========
Modify any property of the bucket.

| **Syntax**
| *.edit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the bucket.*
| *data(object) options to be modified in the bucket.*
|   *\*name(string)*: *a name for the bucket; (optional)*
|   *\*description(string)*: *description for the bucket. (optional)*
|   *\*visible(bool)*: *Set if the bucket will be visible or not. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Buckets;
    var data = {
        "name":"New name for my bucket",
        "description":"This way I can change the description too",
        "visible":true,
        "tags": [
            {"key": "client", "value": "Leonardo"}
        ]
    };

    accbuckets.edit('576dc932415f403531fd2cf6', data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
======
Get informations about the bucket

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the bucket.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Buckets;
    
    accbuckets.info('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
========
Delete bucket for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the bucket.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Buckets;
    
    accbuckets.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Actions
*******
Across the account function, it is possible to manage all your actions. Be sure to use an account token with "write" permissions when using functions like create, edit and delete. The action method is completly different from the class action, since this one can only manage actions, and can't do anything with data related to the action.

.list
========
Retrieve a list with all actions from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accactions   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Actions;
    
    accactions.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new action for the account

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new action.*
|   *\*name(string)*: *a name for the action;*
|   *\*description(string)*: *description for the action. (optional)*
|   *\*active(bool)*: *True if the action is active or not. Default is true(optional)*
|   *\*when_set_bucket(string)*: *ID reference of the bucket(optional)*
|   *\*when_set_origin(string)*: *ID reference of the origin(optional)*
|   *\*when_set_variable(string)*: *name of the variable to trigger when arrive(optional)*
|   *\*when_set_condition(string)*: *Condition to trigger the action. Can be * (Any), = (Equal), >= (Greater Equal) etc.. (optional)*
|   *\*when_set_value(string)*: *Value to be compared by condition. Set to Null if condition is * (Any). (optional)*
|   *\*when_reset_bucket(string)*: *ID reference of the bucket(optional)*
|   *\*when_reset_origin(string)*: *ID reference of the origin(optional)*
|   *\*when_reset_variable(string)*: *name of the variable to trigger when arrive(optional)*
|   *\*when_reset_condition(string)*: *Condition to trigger the action. Can be * (Any), = (Equal), >= (Greater Equal) etc.. (optional)*
|   *\*when_reset_value(string)*: *Value to be compared by condition. Set to Null if condition is * (Any). (optional)*
|   *\*type(string)*: *Type of the action. Can be 'script', 'sms', 'email' or 'post', (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|   **If type is script**
|   *\*script(string)*: *Reference id of the analysis..(optional)*
|   **If type is sms**
|   *\*to(string)*: *Phone number to be sent.(optional)*
|   *\*message(string)*: *Message to be sent in sms.(optional)*
|   **If type is email**
|   *\*to(string)*: *E-mail addres to be sent.(optional)*
|   *\*message(string)*: *Message to be sent in e-mail.(optional)*
|   *\*subject(string)*: *Subject of the e-mail.(optional)*
|
| **Returns**
| *(Promise)*
|   *\*id*: *id of the new action;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accactions   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Actions;
    var data = {
        "name": "a simple action",
        "description": "to trigger when variable test is higher than 2 and reset when is less than 2",
        "when_reset_bucket": "571920982c452fa00c6af660",
        "when_reset_origin": "571920a5cc7d43a00c642ca1",
        "when_reset_variable": "test",
        "when_reset_condition": "<",
        "when_reset_value": "2",
        "when_set_bucket": "571920982c452fa00c6af660",
        "when_set_origin": "571920a5cc7d43a00c642ca1",
        "when_set_variable": "test",
        "when_set_condition": ">",
        "when_set_value": "2",
        "type": "script",
        "script": "577d4c457ee399ef1a6e6cf6",
        "lock": false,
        "active": true,
        "tags": [
            {"key":"Trigger", "value":"2"}
        ]
    };

    accactions.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=====
Modify any property of the action.

| **Syntax**
| *.edit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the action.*
| *data(object) properties to be changed. See `.create`_ to more reference..*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Actions;
    var data = {
        "name":"New name for my action",
        "description":"This way I can change the description too",
        "visible":true,
        "tags": [
            {"key": "client", "value": "Leonardo"}
        ]
    };

    accactions.edit('576dc932415f403531fd2cf6', data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get informations about the action

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the action.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Actions;
    
    accactions.info('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete action for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the action.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').Actions;
    
    accactions.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });