********
Analysis
********
It's possible to run analysis scripts on your computer, or inside Tago server. In the follow pages, you will be instructed on how to setup an analysis on your computer, use our services, and manage any data from Tago.

If you want to get instructions about how to upload your script or how to use third-party packages inside our server, take a look at `admin analysis documentation <http://docs.tago.io/en/latest/analysis.html>`_

Setting Up Analysis
*******************
Through analysis, it is possible to insert any calculation and manage your data from Tago in any way you want. We provide some services, such as SMS and email, but you are free to use any third party packages that you need.

To setup an analysis, you first need a analysis token. That can be retrieved from the `admin analysis section. <http://docs.tago.io/en/latest/analysis.html#setting-up-analysis>`_.

| **Syntax**
| *new Analysis(/function/, /analysis_token/)*
|
| **Arguments**
| *function(function) a function to be executed when the analysis runs.*
| *analysis_token(string) analysis token. Only needed if the script will run remotelly (Optional).*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/analysis');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        console.log('my context:', context);
        console.log('my scope:', scope);
        //Do anything you want here
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


context
*******
As you can setup some predefined parameters in your analysis, it's possible to get these value from the context variable defined in the admin. It is a object, and it comes with follow properties:

    +----------------+--------------------------------------+
    | PROPERTY       |  VALUE                               |
    +================+======================================+
    | environment    | All environment variables            |
    +----------------+--------------------------------------+
    | token          | Token of the analysis                |
    +----------------+--------------------------------------+
    | .log(/msg/)    | Print a message to the admin console |
    +----------------+--------------------------------------+

scope
*****
Every time an action triggers a script, the variable **scope** will be generated. This scope will bring all others variables generated at the same time by the same event. For example, if you submit a `form <http://docs.tago.io/en/latest/dashboard.html#widget-form>`_, together with the variable that the script is reading, the scope will return a list of all values/variable input in that form. This allows you to manipulate data in real time, and more easily the new values inserted in your bucket.

Runtime Timeout
***************
Tago Analysis has a mechanism that prevents scripts from being locked in their executions by applying a timeout of 30 seconds. It means that if a script takes more than 30 seconds to be completed, Tago will abort it, and the script will not be completed.

This limitation doesn't apply when running the analyze from your own machine.  Check the information below to learn how to run scripts from an external server (e.g. from your own computer).

Running in your machine
***********************
You always have the option to run your script from your own machine or from Tago server without any technical difference. When running the script from your machine, you will need to install all the packages used by your analysis by using the command  **npm install mypackage**.

Be sure to set your analysis configuration with the option to run the script from "external". 
And finally, get the analysis token from the same configuration screen, and put it on the second parameter when calling  **new Analysis**. Check out this example:

`module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');`

Tago-Builder and Using Another Packages
***************************************
When you are programming, it can be useful to use another packages inside your code; Or you may want to organize your project using *require* and *subfoulders*.

| Tago is friendly with some packages:
| * **moment** and **moment-timezone**
| * **lodash**
| * **co**
| * **async**
| * **axios**
| * **crypto**
| * **Tago** itself
|
| So you don't need to generate a build if you are using **only** them.
|

Also, Tago only accepts one single .js file when uploading your script to our servers. ago provides a builder CLI that can build your entire project and generate a single .js file with the whole code. You can access the repository `clicking here <https://www.npmjs.com/package/tago-builder>`_

To use our Tago-Builder, follow the following steps:

1. **Type** in your terminal **`npm install -g tago-builder`**
2. **Wait** it for the installation to be completed
3. **Type** in your terminal **`tago-builder 'my script'.js 'new name'.tago.js** *(the last parameter is optional)*.
4. **Upload** the generated **'my script'.tago.js** file to **Tago**.

If everything is okay, a new file called 'my script'.tago.js will be generated. Now you can upload this file to Tago!

Services
********
We provide some functions that can greatly help your application. When creating a analysis, you are can use Tago services on your own, just make sure you understand the policies and cost associate with the usage.

When setting up a service, you need to pass an analysis-token. For convenience, the context returns a property token that you can use to setup a service object.

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/analysis');
    const Services = require('tago/services');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        //Setting up a SMS service
        const sms = new Services(context.token).sms;

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

sms
===
You can configure the system to send SMS directly from your analysis to yourself or your customers. Another option is to use the Actions to send SMS.

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
    const Analysis = require('tago/analysis');
    const Services = require('tago/services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        const sms = new Services(context.token).sms;

        const to      = '2693856214';
        const message = 'Hi! This is a sms example sent from Tago. \nWith a breakline in the sms message.';

        sms.send(to, message).then(console.log).catch(console.log);
        //Print "Sending";

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

email
=====
Email service allows you to send e-mail through your analysis.  Cost may occur when using the e-mail service.

.send
-----
Whenever you need to send an email, use .send function.

| **Syntax**
| *.send(/to/, /subject/, /message/, /from/, /attachment/)*
|
| **Arguments**
| *to(string) E-mail address which will receive the email.*
| *subject(string) Subject of the email;*
| *message(string) message to be sent. Use "<br>" to breakline.*
| *from(string) E-mail address for the receiver to reply. Default is tago@tago.io (optional);*
| *attachment(json) Send an attachment with the email (optional);*
|   *archive Can be anything: binary, string, number...;*
|   *filename(string) Name of the archive with extension. Example: document.txt;*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/analysis');
    const Services = require('tago/services');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        const email = new Services(context.token).email;

        const to      = 'myuser@gmail.com';
        const subject = 'E-mail example';
        const message = 'Hi! This is an email example. \nWith a breakline in the email message.';
        const from    = 'me@gmail.com';
        const attachment = {
            archive: 'This is a txt archive',
            filename: 'document.txt'
        };

        email.send(to, subject, message, from, attachment).then(console.log).catch(console.log);
        //Print "Sending";

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

MQTT
=====
This option gives you a lot of flexibility to interpret any kind of data depending on your application. You can send any data format with any content to this topic, your data will go directly to your Analysis inside the scope on the first position of the array. The data will not be stored automatically, your script need to take care of it.

You can read more about MQTT on Tago in our `MQTT documentation <http://docs.tago.io/en/mqtt/mqtt.html>`_

.send
-----
Use this topic when you want to send a payload data in any format to be first parsed by a specific script.

| **Syntax**
| *.publish(/topic/, /message/)*
|
| **Arguments**
| *topic(string) Topic of the message.*
| *message(string) message to be sent.*
| *bucket(string) bucket id to receive the message. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/analysis');
    const Services = require('tago/services');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        const MQTT = new Services(context.token).MQTT;

        const topic   = 'my topic';
        const message = 'new message';

        MQTT.publish(topic, message).then(console.log).catch(console.log);
        //Print "Sending";
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


Notification to myself
============
Sometimes you may want to send an alert to the account through notification system. You can do it in three ways: pointing to a dashboard, to a bucket or just a notification to the account itself.

When pointing to a dashboard or a bucket, the account owner and anyone he shared the dashboard/bucket will receive the notification.

.send
-----
Use this topic to send a notification.

| **Syntax**
| *.send(/title/, /message/, /ref_id/ )*
|
| **Arguments**
| *title(string) Title of the message.*
| *message(string) message to be sent.*
| *ref_id(string) dashboard/bucket id that your notification will point to. (optional)*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/analysis');
    const Services = require('tago/services');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        const Notification = new Services(context.token).Notification;

        const title   = 'my title';
        const message = 'new message';
        const ref_id = '5915e4a302a0a7002f2a0960'; //bucket id

        Notification.send(title, message, ref_id).then(console.log).catch(console.log);
        //Print "Notification sent";
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
