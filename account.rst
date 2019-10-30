#######
Account
#######
In order to modify information in the account, dashboard, bucket, device and any other settings, it is necessary to use the device functions.

To setup an account object, you need a token that you need to get in our admin website. Make sure to use tokens with the correct write/read previlegies for the current function that you want to use. For example, a token with only read previlegies can't create, modify or delete anything from an account.

.info
*******
Get all account information

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
**********
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


.tokenCreate
************
Generate and retrieve a new token for the account

| **Syntax**
| *.tokenCreate()*
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

    myacc.tokenCreate({"name":"My First Token", "expire_time": New Date()})
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.tokenDelete
************
Delete current token of the account

| **Syntax**
| *.tokenDelete()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myacc   = new Account('0e479db0-tag0-11e6-8888-790d555b633a');

    myacc.tokenDelete()
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Devices
*******
Across the account function, it is possible to manage all your devices. Make sure that you use an account token with "write" permission when using functions to create, edit and delete. The Device method is completly different from the class Device, since this one can only manage devices, and can't do anything with data related to the device.

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
    const accdevices   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    
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
|   *\*active(bool)*: *Set if the device will be active. Default True. (optional)*
|   *\*visible(bool)*: *Set if the device will be visible. Default True. (optional)*
|   *\*configuration_params(array)*: *An array of objects with sent(bool), key(string) and value(string). (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*token*: *token for the generated device;*
|   *\*id*: *id of the new device;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdevices   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    var data = {
        "name":"My first device",
        "description":"Creating my first device",
        "active":true,
        "visible":true,
        "tags": [
            {"key": "client", "value": "John"}
        ]
        "configuration_params": [
            {"sent": false, "key": "check_rate", "value": 600}
            {"sent": false, "key": "measure_time", "value": 0}
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
|   *\*active(bool)*: *Set if the device will be active. Default True. (optional)*
|   *\*visible(bool)*: *Set if the device will be visible. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    var data = {
        "name":"New name for my device",
        "description":"In this way I can change the description too",
        "active":false,
        "visible":true,
        "tags": [
            {"key": "client", "value": "Mark"}
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
Get information about the device

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
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    
    accdevices.info('576dc932415f403531fd2cf6')
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
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    
    accdevices.delete('576dc932415f403531fd2cf6')
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
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;
    
    accdevices.tokenList('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.tokenCreate
============
Generate and retrieve a new token for the device

| **Syntax**
| *.tokenCreate(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the device.*
| *data(object) options for the new token.*
|   *\*name(string)*: *a name for the token;*
|   *\*expire_time(string)*: *Time when token should expire. It will be randomly generated if not included. Accept "never" as value.*
|   *\*permission(string)*: *Token permission, should be `write`, `read` or `full`.*
|   *\*serie_number(string)*: *Serial number of the device. (optional)*
|   *\*verification_code(string)*: *Verification code to validate middleware requests. (optional)*
|   *\*middleware(string)*: *Middleware or type of the device that will be added.. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;

    accdevices.tokenCreate({"name":"My First Token", "expire_time": "never", "permission":"full"})
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.tokenDelete
============
Delete an token of the Device

| **Syntax**
| *.tokenDelete(/token/)*
|
| **Arguments**
| *token(string) reference token.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdevices = new Account('0e479db0-tag0-11e6-8888-790d555b633a').devices;

    accdevices.tokenDelete('298d17f0-7061-11e6-ab66-b174d8afb89d')
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

Buckets
*******
Across the account function, it is possible to manage all your buckets. Be sure to use an account token with "write" permissions when using functions like create, edit and delete.

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
    const accbuckets   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').buckets;
    
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
    const accbuckets   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').buckets;
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
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').buckets;
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
Get information about the bucket

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
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').buckets;
    
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
    const accbuckets = new Account('0e479db0-tag0-11e6-8888-790d555b633a').buckets;
    
    accbuckets.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Actions
*******
Across the account function, it is possible to manage all your actions. Be sure to use an account token with "write" permissions when using functions like create, edit and delete.

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
    const accactions   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').actions;
    
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
    const accactions   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').actions;
    var data = {
        "name": "a simple action",
        "description": "trigger when the variable test is higher than 2, and reset it when is less than 2",
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
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').actions;
    var data = {
        "name":"New name for my action",
        "description":"In this way I can change the description too",
        "visible":true,
        "tags": [
            {"key": "client", "value": "Mark"}
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
Get information about the action

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
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').actions;
    
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
    const accactions = new Account('0e479db0-tag0-11e6-8888-790d555b633a').actions;
    
    accactions.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Analysis
********
Across the account function, it is possible to manage all your analysis. Be sure to use an account token with "write" permissions when using functions like create, edit and delete. The analysis method is completly different from the class analysis,  since it only manages the analysis information and not the code that it runs.

.list
=====
Retrieve a list with all analysis from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accanalysis   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    
    accanalysis.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new analysis for the account

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new analysis.*
|   *\*name(string)*: *a name for the analysis;*
|   *\*description(string)*: *description for the analysis. (optional)*
|   *\*interval(string)*: *time interval for analysis to run. Default is Never;*
|   *\*active(bool)*: *Set if the analysis will be active. Default True. (optional)*
|   *\*variables(array)*: *Environment variables to be passed when the analysis runs. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*token*: *token for the generated analysis;*
|   *\*id*: *id of the new analysis;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accanalysis   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    var data = {
        "name":"My first analysis",
        "description":"Creating my first analysis",
        "active":true,
        "interval": '1 minute',
        "variables": [
            {"key": "max_battery", "value": "3100"}
        ],
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };

    accanalysis.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=====
Modify any property of the analysis.

| **Syntax**
| *.edit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the analysis.*
| *data(object) options to be modified in the analysis.*
|   *\*name(string)*: *a name for the analysis; (optional)*
|   *\*description(string)*: *description for the analysis. (optional)*
|   *\*interval(string)*: *time interval for analysis to run. Default is Never;*
|   *\*active(bool)*: *Set if the analysis will be active. Default True. (optional)*
|   *\*variables(array)*: *Environment variables to be passed when the analysis runs. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accanalysis = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    var data = {
        "name":"New name for my analysis",
        "description":"In this way I can change the description too",
        "active":false,
        "interval": '2 minutes',
        "variables": [
            {"key": "max_battery", "value": "3000"}
        ],
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };

    accanalysis.edit('576dc932415f403531fd2cf6', data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get information about the analysis

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the analysis.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accanalysis = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    
    accanalysis.info('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete analysis for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the analysis.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accanalysis = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    
    accanalysis.delete('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.run
=======
Force Analysis to run immediately

| **Syntax**
| *.run(/id/)*
|
| **Arguments**
| *id(string) reference ID of the analysis.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accanalysis = new Account('0e479db0-tag0-11e6-8888-790d555b633a').analysis;
    
    accanalysis.run('576dc932415f403531fd2cf6')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

Dashboards
**********
Across the account function, it is possible to manage all your dashboards. Be sure to use an account token with "write" permissions when using functions like create, edit and delete.

.list
=====
Retrieve a list with all dashboards from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdashboards   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    
    accdashboards.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new dashboard for the account

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new dashboard.*
|   *\*label(string)*: *a label for the dashboards;*
|   *\*arrangement(array)*: *array of objects with arrangement of the widget inside the dashboard. (optional)*
|       *\*widget_id(string)*: *id of the widget*
|       *\*x(number)*: *position x of the widget. 1 to 4;*
|       *\*y(number)*: *position y of the widget. 1 to 20*
|       *\*width(number)*: *width of the widget. 1 to 4*
|       *\*height(number)*: *height of the widget. 1 to 20*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*token*: *token for the generated dashboard;*
|   *\*id*: *id of the new dashboard;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdashboards   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    var data = {
        "label":"My first dashboard",
        "arrangement": [
            {"widget_id": "577c28d269d2861f1b2e93b8", "x":0, "y":0, "width":2, "height":3 }
        ],
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };

    accdashboards.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=====
Modify any property of the dashboards.

| **Syntax**
| *.edit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the dashboards.*
| *data(object) options to be modified in the dashboards.*
|   *\*label(string)*: *a label for the dashboards;*
|   *\*arrangement(array)*: *array of objects with arrangement of the widgest inside the dashboard. (optional)*
|       *\*widget_id(string)*: *id of the widget*
|       *\*x(number)*: *position x of the widget. 1 to 4;*
|       *\*y(number)*: *position y of the widget. 1 to 20*
|       *\*width(number)*: *width of the widget. 1 to 4*
|       *\*height(number)*: *height of the widget. 1 to 20*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    var data = {
        "label":"New name for my dashboards",
    };

    accdashboards.edit('877c28d269d2861f1b2e96b8', data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get information about the dashboards

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the dashboards.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    
    accdashboards.info('877c28d269d2861f1b2e96b8')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete dashboards for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the dashboards.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    
    accdashboards.delete('877c28d269d2861f1b2e96b8')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Widgets
********
Inside dashboards, you need widgets to show and control information inside buckets. Every widget have their data slighty different from each other, to know how do they work

.list
=====
Retrieve a list with all widgets from dashboard

| **Syntax**
| *.list()*
|
| **Arguments**
| *dashboard_id(string) dashboard id for the dashboard.*
| **Returns**
| *(Promise)*
|   *\*result(array)*: *Array list of widgets;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    const dashboard_id = '877c28d269d2861f1b2e96b1';
    accdashboards.widgets.list(dashboard_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.create
=======
Generate and retrieve a new widget for the dashboard

| **Syntax**
| *.create(/dashboard_id/, /data/)*
|
| **Arguments**
| *dashboard_id(string) dashboard id for the dashboard.*
| *data(object) options for the new widget.*
|   *\*label(string)*: *a label for the dashboards;*
|   *\*arrangement(array)*: *array of objects with arrangement of the widget inside the dashboard. (optional)*
|       *\*widget_id(string)*: *id of the widget*
|       *\*x(number)*: *position x of the widget. 1 to 4;*
|       *\*y(number)*: *position y of the widget. 1 to 20*
|       *\*width(number)*: *width of the widget. 1 to 4*
|       *\*height(number)*: *height of the widget. 1 to 20*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdashboards   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    const dashboard_id = '577c28d269d2861f1b2e93ba';
    var data = {
        "label":"My first dashboard",
        "arrangement": [
            {"widget_id": "577c28d269d2861f1b2e93b8", "x":0, "y":0, "width":2, "height":3 }
        ],
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };

    accdashboards.widgets.create(dashboard_id, data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=======
Modify any property of the widget.

| **Syntax**
| *.edit(/dashboard_id/, /widge_id/, /data/)*
|
| **Arguments**
| *dashboard_id(string) dashboard id for the dashboard.*
| *widge_id(string) widget id for the dashboard.*
| *data(object) options for the new widget.*
|   *\*label(string)*: *a label for the dashboards;*
|   *\*arrangement(array)*: *array of objects with arrangement of the widget inside the dashboard. (optional)*
|       *\*widget_id(string)*: *id of the widget(optional)*
|       *\*x(number)*: *position x of the widget. 1 to 4; (optional)*
|       *\*y(number)*: *position y of the widget. 1 to 20(optional)*
|       *\*width(number)*: *width of the widget. 1 to 4(optional)*
|       *\*height(number)*: *height of the widget. 1 to 20(optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accdashboards   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    const dashboard_id = '577c28d269d2861f1b2e93ba';
    const widget_id = '577c28d269d2861f1b2e93be';
    var data = {
        "label":"My first dashboard",
        "arrangement": [
            {"widget_id": "577c28d269d2861f1b2e93b8", "x":0, "y":0, "width":2, "height":3 }
        ],
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };

    accdashboards.widgets.edit(dashboard_id, widget_id, data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get information about the widget

| **Syntax**
| *.info(/dashboard_id/, /widge_id/)*
|
| **Arguments**
| *id(string) reference ID of the dashboard.*
| *id(string) reference ID of the widget.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;
    const dashboard_id = '576dc932415f403531fd2cf1';
    const widget_id = '576dc932415f403531fd2cf6';
    accdashboards.widgets.info(dashboard_id, widget_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete access widget for the dashboard

| **Syntax**
| *.delete(/dashboard_id/, /widge_id/)*
|
| **Arguments**
| *id(string) reference ID of the dashboard.*
| *id(string) reference ID of the widget.*
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
   const accdashboards = new Account('0e479db0-tag0-11e6-8888-790d555b633a').dashboards;

    const dashboard_id = '576dc932415f403531fd2cf1';
    const widget_id = '576dc932415f403531fd2cf6';

    accdashboards.widgets.delete(dashboard_id, widget_id).then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


notifications to myself
*************
All accounts have an notification system, where you can see alerts of account limit and accept/refuse share of dashboards, profiles.

.list
=====
Retrieve a list with all notifications from account

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|   *\*result(array)*: *Array list of notifications;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const notifications   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').notifications;
    
    notifications.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.markAsRead
===========
Mark a notification as read/ignored.

| **Syntax**
| *.markAsRead(/id_list/)*
|
| **Arguments**
| *\*id_list(array)*: *array of notification ids;*
|
| **Returns**
| *(Promise)*
|   *\*result*: *Notifications marked as read;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const notifications   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').notifications;
    
    const id_list = ['5915e4a302a0a7002f2a0960', '4915e4a302a0a7002f3a0982']
    notifications.markAsRead(id_list)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.accept
=======
Accept the notification if it has a condition.

| **Syntax**
| *.accept(/notification_id/)*
|
| **Arguments**
| *\*notification_id(string)*: *ID of the notification;*
|
| **Returns**
| *(Promise)*
|   *\*result*: *Notification succesfully accepted;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const notifications   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').notifications;
    
    const notification_id = '5915e4a302a0a7002f2a0960'
    notifications.accept(notification_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.refuse
=======
Refuse the notification if it has a condition.

| **Syntax**
| *.refuse(/notification_id/)*
|
| **Arguments**
| *\*notification_id(array)*: *ID of the notification;*
|
| **Returns**
| *(Promise)*
|   *\*result*: *Notification succesfully refused;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const notifications   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').notifications;
    
    const notification_id = '5915e4a302a0a7002f2a0960'
    notifications.refuse(notification_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


TagoRun Users
*************

You can manage your TagoRun and Run Users. In order to modify, add, delete or do anything else with the data inside Run. See more about Tago Run `here <https://tago.elevio.help/en/articles/201>`_.

To setup an device object, you need a account-token (that you need to get in our website). Be sure to use tokens with the correct write/read previlegies for the current function that you want to use. For example, a token with only read previlegies can't create, modify or delete anything from a Run.

.info
=====
Get all information from the run 

| **Syntax**
| *.info()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accrun = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    
    accrun.info()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });
 

.listUsers
=====
Retrieve a list with all users from Run

| **Syntax**
| *.listUsers()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    
    accrun.listUsers()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.getUserInfo
=====
Get run user information

| **Syntax**
| *.getUserInfo()*
|
|
| **Arguments**
| *\*user_id(string)*: *ID of the run user;*
|
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    const user_id = '5d9c6e7945f7ab001b0a32c1';

    myaccrun.getUserInfo(user_id)
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });



.userEdit
=====
Modify any property of the Run User.

| **Syntax**
| *.userEdit(/id/, /data/)*
|
| **Arguments**
| *id(string) reference ID of the run user.*
| *data(object) options to be modified in the run user.*
|   *\*name(string)*: *a name for the run user; (optional)*
|   *\*email(string)*: *email for the run user. (optional)*
|   *\*phone(string)*: *phone for the run user. (optional)*
|   *\*timezone(string)*: *email for the run user. (optional)*
|   *\*company(string)*: *company for the run user. (optional)*
|   *\*active(bool)*: *Set if the run user will be active. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    var data = {
        "name":"New name for my Run User",
        "tags": [
            {"key": "client", "value": "Mark"}
        ]
    };
    const user_id = '5d9c6e7945f7ab001b0a32c1';
    myaccrun.userEdit(user_id, data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.createUser
=====
Create a new Run User.

| **Syntax**
| *.createUser(/data/)*
|
| **Arguments**
| *data(object) options to be modified in the run user.*
|   *\*name(string)*: *a name for the run user.*
|   *\*email(string)*: *email for the run user.*
|   *\*password(string)*: *password for the run user.*
|   *\*phone(string)*: *phone for the run user. (optional)*
|   *\*timezone(string)*: *email for the run user. (optional)*
|   *\*company(string)*: *company for the run user. (optional)*
|   *\*active(bool)*: *Set if the run user will be active. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    var data = {
        "name":"John Doe",
        "email": "jhon@doe.com",
        "password": "123abc",
        "tags": [
            {"key": "employee", "value": "Manager"}
        ]
    };

    myaccrun.userEdit(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.deleteUser
=====
Delete run user

| **Syntax**
| *.deleteUser()*
|
|
| **Arguments**
| *\*user_id(string)*: *ID of the run user;*
|
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    const user_id = '5d9c6e7945f7ab001b0a32c1';

    myaccrun.deleteUser(user_id)
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

Notification to users
*************

You can push notification messages directly to the users registered in your Run. See more about notification for users `here <https://tago.elevio.help/en/articles/223>`_.

.notificationList
=====
Retrieve a list with all notifications for the Run user

| **Syntax**
| *.notificationList()*
|
| **Arguments**
| *\*user_id(string)*: *ID of the run user;*
|
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    
    const user_id = '5d9c6e7945f7ab001b0a32c1';
    accrun.notificationList(user_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.notificationEdit
=====
Modify any property of the user push notification.

| **Syntax**
| *.notificationEdit(/notification_id/, /data/)*
|
| **Arguments**
| *notification_id(string) reference ID of the notification.*
| *data(object) options to be modified in the notification.*
|   *\*title(string)*: *a title for the notification. (optional)*
|   *\*message(string)*: *message for the notification. (optional)*
|   *\*buttons(array of object)*: *phone for the run user. (optional)*
|      *\*label(string)*: *label for notification button. (optional)*
|      *\*analysis(string)*: *analysis_id for notification button. This analysis is run when the button is pressed. (optional)*
|      *\*url(string)*: *url for notification button. Open a link when the button is pressed. (optional)*
|      *\*color(string)*: *color for notification button. Accept hexadecimal colors, like: '#bcbcbc'. (optional)*
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    const data = {
        "title": "Temperature Alert",
        "message": "The temperature is too high"
        "buttons": [{
            "label": "Go to device dashboard",
            "url": "https://admin.tago.io/dashboard/info/5d9c6e7945f7ab001b0a32c2",
            "color": "red",
            // "analysis": "5d9c6e7945f7ab001b0a32c2",
            
        }],
    };
    const notification_id = '5d9c6e7945f7ab001b0a32c1';
    myaccrun.notificationEdit(notification_id, data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.notificationCreate
=====

Create a new push notification for the user.

| **Syntax**
| *.notificationCreate(/data/)*
|
| **Arguments**
| *data(object) options to be modified in the notification.*
|   *\*title(string)*: *a title for the notification.*
|   *\*message(string)*: *message for the notification.*
|   *\*buttons(array of object)*: *phone for the run user.*
|      *\*label(string)*: *label for notification button.*
|      *\*analysis(string)*: *analysis_id for notification button. This analysis is run when the button is pressed. (optional)*
|      *\*url(string)*: *url for notification button. Open a link when the button is pressed. (optional)*
|      *\*color(string)*: *color for notification button. Accept hexadecimal colors, like: '#bcbcbc'. (optional)*
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const myaccrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    const data = {
        "title": "Temperature Alert",
        "message": "The temperature is too high"
        "buttons": [{
            "label": "Go to device dashboard",
            "url": "https://admin.tago.io/dashboard/info/5d9c6e7945f7ab001b0a32c2",
            "color": "red",
            // "analysis": "5d9c6e7945f7ab001b0a32c2",
            
        }],
    };

    myaccrun.notificationCreate(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.notificationDelete
=====
Delete push notifcation for the run user

| **Syntax**
| *.notificationDelete()*
|
|
| **Arguments**
| *\*notification_id(string)*: *ID of the notification;*
|

| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accrun   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').run;
    
    const notification_id = '5d9c6e7945f7ab001b0a32c1';
    accrun.notificationDelete(notification_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


Access Management
*******
Access Management (AM) is a module that helps you securely grant access to certain resources in your account. You create Targets (users or things) and determine which type of Permissions for the resources they will have. See more about Access Management `here <https://tago.elevio.help/en/articles/183>`_.

.list
=====
Retrieve a list with all access management from account.

| **Syntax**
| *.list()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accam   = new Account('0e479db0-tag0-11e6-8888-790d555b633a').accessManagement;
    
    accam.list()
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

.create
=======
Generate and retrieve a new access management for the account.

| **Syntax**
| *.create(/data/)*
|
| **Arguments**
| *data(object) options for the new access management.*
|   *\*name(string)*: *a name for the access management.*
|   *\*permissions(array)*: *permissions for the access management.*
|       *\*effect(string)*: *effect for the access management. access or deny.*
|       *\*action(string)*: *action for the access management.*
|       *\*resource(string)*: *resource for the access management.*
|   *\*targets(array)*: *targets for the access management.*
|   *\*active(bool)*: *Set if the access management will be visible. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|   *\*am_id*: *id of the new access management;*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accam = new Account('0e479db0-tag0-11e6-8888-790d555b633a').AccessManagement;
    const user = {
        id: '576dc932415f403531fd2cf6',
        name: 'John Doe',
    };
    const data = {
        name: `Dashboards for the user ${user.name}`,
        tags: [{ key: 'client_id', value: user.id }],
        targets: [
        [
            'run_user',
            'id',
            user.id,
        ],
        ],
        permissions: [
        {
            effect: 'allow',
            action: [
            'access',
            ],
            resource: [
            'dashboard',
            'tag.key',
            'client_id',
            'tag.value',
            user.id,
            ],
        },
        ],
    };

    accam.create(data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.edit
=====
Modify any property of the access management.

| **Syntax**
| *.edit(/am_id/, /data/)*
|
| **Arguments**
| *data(am_id) id for the new access management.*
| *data(object) options for the new access management.*
|   *\*name(string)*: *a name for the access management.(optional)*
|   *\*permissions(array of object)*: *permissions for the access management.(optional)*
|       *\*effect(string)*: *effect for the access management. access or deny (optional)*
|       *\*action(string)*: *action for the access management.(optional)*
|       *\*resource(string)*: *resource for the access management.(optional)*
|   *\*targets(array of arrays)*: *targets for the access management.(optional)*
|   *\*active(bool)*: *Set if the access management will be visible. Default True. (optional)*
|   *\*tags(array)*: *An array of objects with key and value. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account = require('tago/account');
    const accam = new Account('0e479db0-tag0-11e6-8888-790d555b633a').AccessManagement;
    const am_id = '576dc932415f403531fd2cf6'
    const data = {
        name: 'my new name of access management',
    };

    accam.create(am_id, data)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.info
=====
Get information about the access management

| **Syntax**
| *.info(/id/)*
|
| **Arguments**
| *id(string) reference ID of the access management.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accam = new Account('0e479db0-tag0-11e6-8888-790d555b633a').AccessManagement;
    const access_management_id = '576dc932415f403531fd2cf6';
    accam.info(access_management_id)
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.delete
=======
Delete access management for the account

| **Syntax**
| *.delete(/id/)*
|
| **Arguments**
| *id(string) reference ID of the access management.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Account    = require('tago/account');
    const accam = new Account('0e479db0-tag0-11e6-8888-790d555b633a').AccessManagement;

    const access_management_id = '576dc932415f403531fd2cf6';
    accam.delete(access_management_id')
        .then((result) => { 
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

