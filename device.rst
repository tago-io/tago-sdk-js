******
Device 
******
In order to modify, add, delete or do anything with data inside buckets, is necessary to use the device function.

To setup an device object, you need a token (that you need to get in our website). Make sure to use tokens with correct write/read previlegies for the currenct function you want to use. For example, token with only read previlegies can't create, modify or delete anything from a device.

.info
*******
Get all device informations

| **Syntax**
| *.info()*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev  = new Device('0e479db0-tag0-11e6-8888-790d555b633a');

    mydev.info()
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.insert
*******
Insert a new data into the bucket. You can get more informations about what can be passed to insert in our `api documentation <http://docs.tago.io/en/latest/api.html#send-data>`_

| **Syntax**
| *.insert(/data/)*
|
| **Arguments**
| *data(object) properties for the new data.*
|   *\*variable(string)*: *name of the variable. Obrigatory for data to be inserted;*
|   *\*value(string)*: *a value for the data (optional);*
|   *\*unit(string)*: *a unit for the data, like 'km', or 'l'. It shows in some widgets (optional);*
|   *\*time(string)*: *a time for the data. Default is now;*
|   *\*serie(string)*: *a serie for the data. Only useful for some widgets and grouping with other datas;*
|   *\*location(object/geojson)*: *a location object or geojson containing lat and lang;*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev  = new Device('0e479db0-tag0-11e6-8888-790d555b633a');
    var data = {
        'variable': 'temperature',
        'unit'    : 'F',
        'value'   : 55,
        'time'    : '2015-11-03 13:44:33',
        'location': {'lat': 42.2974279, 'lng': -85.628292}
    };

    mydev.insert(data)
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.find
*******
Get a list of data from bucket respecting the query options passed. You can get more informations about what can be passed to find in our `get documentation <http://docs.tago.io/en/latest/api.html#get-data>`_

| **Syntax**
| *.find(/filter/)*
|
| **Arguments**
| *filter(object) filter options when retrieving data. (optional)*
|   *\*variable(string/array)*: *Filter by variable. If none is passed, get the last ones (optional);*
|   *\*query(string)*: *Do a specific query. See the* `query documentation <http://docs.tago.io/en/latest/api.html#query>`_ *to know what can be passed. (optional)*
|   *\*end_date(string)*: *Get data until a specific date. (optional)*
|   *\*start_date(string)*: *Get data started from a specific date. (optional)*
|   *\*qty(number)*: *Number of data to be retrieve. Default is 15. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev  = new Device('0e479db0-tag0-11e6-8888-790d555b633a');
    var filter = {
        'variable':   'myvar',
        'query':      'last_value',
        'end_date':   '2014-12-25 23:33:22',
        'start_date': '2014-12-20 23:33:22'
    };
    
    mydev.info(filter)
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });


.remove
*******
Remove a data from the bucket. It's possible to remove in three ways:
* The last data inserted by the device
* The last data inserted by device into a variable
* A specific data by it ID

| **Syntax**
| *.remove(/variable_or_id/, /qty/)*
|
| **Arguments**
| *variable_or_id(string) a variable name or an specific ID. (optional)*
| *qty(number) specify a number of records to be removed. Default is 1. (optional)*
| If no parameter is passed, will automatically remove the last data inserted by this device.
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev   = new Device('0e479db0-tag0-11e6-8888-790d555b633a');

    mydev.remove()
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });

or 

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev   = new Device('0e479db0-tag0-11e6-8888-790d555b633a');

    mydev.remove('myvariable')
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });
        
or 

.. code-block:: javascript

    const Device = require('tago/device');
    const mydev   = new Device('0e479db0-tag0-11e6-8888-790d555b633a');

    mydev.remove('577d81ac7ee399ef1a6e98da')
        .then((result) => {
            //You can treat the result here
        })
        .catch((error) => {
            //You can treat errors here
        });