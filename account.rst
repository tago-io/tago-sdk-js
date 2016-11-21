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
        "name":"My first dashboard",
        "arrangement": [
            {"widget_id": "577c28d269d2861f1b2e93b8", "x":0, "y":0, "width":2, "height":3 }
        ]
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
