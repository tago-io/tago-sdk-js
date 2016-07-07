********
Analysis
********
It's possible to run analysis scripts on your computer, or inside tago server. In the follow pages you will be instructed on how to setup an analysis on your computer, use our services and manage any data from tago.

If you want to get instructions about how to upload your script, use and use third-party packages inside our server, see the `admin analysis documentation <http://docs.tago.io/en/latest/analysis.html>`_

Setting Up Analysis
*******************
Through analysis, it's possible to insert any calculation and manage your data from tago in any way you want. We provide some services, like sms and email, but you are free to use any third party packages you want.

To setup an analysis, you first need a analysis token. That can be retrieve in the `admin analysis section. <http://docs.tago.io/en/latest/analysis.html#setting-up-analysis>`_.

| **Syntax**
| *new Analysis(/function/, /analysis_token/)*
|
| **Arguments**
| *function(function) a function to be executed when analysis run.*
| *analysis_token(string) analysis token. Only needed if script will run locally (Optional).*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        console.log('my context:', context);
        console.log('my scope:', scope);
        //Do anything you want here
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


context
*******
As you can setup some pre-defined things in your analysis, inside admin, it's possible to get these by the context variable. It is a object, and come with follow properties:

    +----------------+-------------------------------+
    | PROPERTY       |  VALUE                        |
    +================+===============================+
    | environment    | All environment variables     |
    +----------------+-------------------------------+
    | token          | Token of the analysis         |
    +----------------+-------------------------------+
    | id             | ID of the analysis            |
    +----------------+-------------------------------+

scope
*****
Every time an action triggers a script, the variable **scope** will be generated. This scope will bring all others variables generated at the same time by the same event. For example, if you submit a `form <http://docs.tago.io/en/latest/dashboard.html#widget-form>`, together with the variable that the script is reading, the scope will return a list of all values/variable input in that form. This allows you to manipulate in real time, and more easily, any new value inserted in your bucket.

Build
*****

Services
********
We provide some inside functions, that are paid. When creating a analysis, you are free to use our services on your own. Just be cautious.

When setting up a service, you need to pass an analysis token. For convenience, context return a property token, that you can use to setup a service object.

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        //Setting up a sms service for example
        let sms = Services(context.token).sms;

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

sms
===
You can configure the system to send sms directly from your analysis. Another option is to use the Actions to send SMS.

Some costs may occur when using the SMS service, which varies based on the country of operation. Check pricing, terms of use, and your plan before using the SMS service.

.send
-----
Whenever you need to send a sms, use .send function.

| **Syntax**
| *.send(/to/, /message/)*
|
| **Arguments**
| *to(string) A string with a phone number. If not sending to the USA, you have to add the country code, (+55) for Brazil, for example.*
| *message(string) message to be sent. Use "\n" to breakline. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let sms = Services(context.token).sms;

        let to      = '2693856214';
        let message = 'Hi! This is a sms example. \nWith a breakline in the sms message.';

        sms.send(to, message).then(console.log);
        //Will print "Sending";

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

email
=====
Email service allows you to send e-mail through your analysis. Some costs may occur when using the e-mail service

.send
-----
Whenever you need to send an email, use .send function.

| **Syntax**
| *.send(/to/, /subject/, /message/, /from/)*
|
| **Arguments**
| *to(string) E-mail address which will receive the email.*
| *subject(string) Subject of the email;*
| *message(string) message to be sent. Use "<br>" to breakline.*
| *from(string) E-mail address to receive replies. Default is tago@tago.io (optional);*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let email = Services(context.token).email;

        let to      = 'myuser@gmail.com';
        let subject = 'E-mail example';
        let message = 'Hi! This is a email example. \nWith a breakline in the email message.';
        let from    = 'me@gmail.com';

        email.send(to, subject, message, from).then(console.log);
        //Will print "Sending";

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

geocoding
=========
Whenever you need to get a geolocation by it address, or vice versa. Use geocoding function. 

.get_geolocation
----------------
Convert the address to a valid geolocation, if it exists.

| **Syntax**
| *.get_geolocation(/address/)*
|
| **Arguments**
| *address(string) A valid address.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let geocoding = Services(context.token).geocoding;

        let address = '1017 Main Campus Dr, Raleigh, NC 27606, EUA';

        geocoding.get_geolocation(address).then(console.log);
        //Will print [-78.6772532,35.7704823];
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

.get_address
------------
Convert a valid geolocation to an address, if it exists.

| **Syntax**
| *.get_address(/geolocation/)*
|
| **Arguments**
| *geolocation(string) A valid geolocation.*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let geocoding = Services(context.token).geocoding;

        let geolocation = [-78.6772532,35.7704823];

        geocoding.get_address(geolocation).then(console.log);
        //Will print '1017 Main Campus Dr, Raleigh, NC 27606, EUA';
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
    
currency
========

distance
========

weather
=======