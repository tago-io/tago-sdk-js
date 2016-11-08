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
    const Analysis = require('tago/Analysis');

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
Every time an action triggers a script, the variable **scope** will be generated. This scope will bring all others variables generated at the same time by the same event. For example, if you submit a `form <http://docs.tago.io/en/latest/dashboard.html#widget-form>`, together with the variable that the script is reading, the scope will return a list of all values/variable input in that form. This allows you to manipulate data in real time, and more easily the new values inserted in your bucket.

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

Also, Tago only accepts one single .js file when uploading your script to our servers. Tago provides you with a Tago-Builder CLI that will build your entire project in that single .js file. You can access the repository `clicking here <https://www.npmjs.com/package/tago-builder>`._

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
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

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
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

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
| *.send(/to/, /subject/, /message/, /from/)*
|
| **Arguments**
| *to(string) E-mail address which will receive the email.*
| *subject(string) Subject of the email;*
| *message(string) message to be sent. Use "<br>" to breakline.*
| *from(string) E-mail address for the receiver to reply. Default is tago@tago.io (optional);*
|
| **Returns**
| *(Promise)*
|

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis are called
    function myanalysis(context, scope) {
        const email = new Services(context.token).email;

        const to      = 'myuser@gmail.com';
        const subject = 'E-mail example';
        const message = 'Hi! This is an email example. \nWith a breakline in the email message.';
        const from    = 'me@gmail.com';

        email.send(to, subject, message, from).then(console.log).catch(console.log);
        //Print "Sending";

    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

geocoding
=========
Whenever you need to get a geolocation (lat/lon) based on a valid address, or vice versa. Use geocoding function. 

.getGeolocation
----------------
Convert the address to a valid geolocation, if it exists.

| **Syntax**
| *.getGeolocation(/address/)*
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

    //Main function to be executed when an analysis is called
    function myanalysis(context, scope) {
        const geocoding = new Services(context.token).geocoding;

        const address = '1017 Main Campus Dr, Raleigh, NC 27606, USA';

        geocoding.getGeolocation(address).then(console.log).catch(console.log);
        //Print [-78.6772532,35.7704823];
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

.getAddress
------------
Convert a valid geolocation to an address, if it exists.

| **Syntax**
| *.getAddress(/geolocation/)*
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

    //Main function to be executed when an analysis is called
    function myanalysis(context, scope) {
        const geocoding = new Services(context.token).geocoding;

        const geolocation = '35.7704823,-78.6772532';

        geocoding.getAddress(geolocation).then(console.log).catch(console.log);
        //Print '1017 Main Campus Dr, Raleigh, NC 27606, USA';
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
    
currency
========
Check several currencies in real-time, and the historical exchange rates for more than 168 countries.

.convert
--------
Return the current exchange rate of one currency to another one.

| **Syntax**
| *.convert(/origins/, /destinations/, /language/, /mode/)*
|
| **Arguments**
| *from(string) convert from. See `supported currencies <https://currencylayer.com/currencies>`_ for more information.*
| *to(string) convert to.*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const currency = new Services(context.token).currency;

        const from = 'USD';
        const to   = 'BRL';

        currency.convert(from, to).then(console.log).catch(console.log);
        //Print Example: 3.29883848
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

distance
========
Whenever you need to calculate the distance between two points use distance service.

.measure
--------
Measure is a service that provides the travel distance and time for a matrix of origins and destinations.

| **Syntax**
| *.measure(/origins/, /destinations/, /language/, /mode/)*
|
| **Arguments**
| *origins(array) An array of origins, can be string location or geojson..*
| *destinations(array) An array of destinations, can be string location or geojson.*
| *language(string) Set a language. Default is 'EN'. See `language support <https://developers.google.com/maps/faq#languagesupport>`_ for more information. (optional)*
| *mode(string) For the calculation of distances, you may specify the transportation mode to use. By default, distances are calculated for driving mode. See the `travel modes <https://developers.google.com/maps/documentation/distance-matrix/intro#travel_modes>`_ supported for more information.*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        const distance = new Services(context.token).distance;

        const origins      = [ "New York, NY, USA" ];
        const destinations = [ "Washington, DC, USA" ];
        const language     = 'EN';
        const mode         = 'driving';

        distance.measure(origins, destinations, language, mode).then(console.log).catch(console.log);
        //Print
        //TODO; PUT PRINT HERE;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

weather
=======
Whenever you need to get weather conditions around the world, use weather service.

.current
--------
Get the current weather conditions.

| **Syntax**
| *.current(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) It can be address, zipcode or geojson.*
| *full(boolean) Set to get response with full description. Default is false. (optional)*
| *language(string) Set the language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const weather = new Services(context.token).weather;

        const query = '1017 Main Campus Dr, Raleigh, NC 27606, USA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        const full     = false;
        const language = "EN"

        weather.current(query, full, language).then(console.log).catch(console.log);
        //Print {"station_id":"KNCRALEI48","observation_time":"Last Updated on July 8, 5:40 PM EDT","observation_time_rfc822":"Fri, 08 Jul 2016 17:40:04 -0400","observation_epoch":"1468014004","local_time_rfc822":"Fri, 08 Jul 2016 17:42:43 -0400","local_epoch":"1468014163","local_tz_short":"EDT","local_tz_long":"America/New_York","local_tz_offset":"-0400","weather":"Partly Cloudy","temperature_string":"88.9 F (31.6 C)","temp_f":88.9,"temp_c":31.6,"relative_humidity":"68%","wind_string":"Calm","wind_dir":"North","wind_degrees":-9999,"wind_mph":0,"wind_gust_mph":0,"wind_kph":0,"wind_gust_kph":0,"pressure_mb":"1011","pressure_in":"29.86","pressure_trend":"-","dewpoint_string":"77 F (25 C)","dewpoint_f":77,"dewpoint_c":25,"heat_index_string":"102 F (39 C)","heat_index_f":102,"heat_index_c":39,"windchill_string":"NA","windchill_f":"NA","windchill_c":"NA","feelslike_string":"102 F (39 C)","feelslike_f":"102","feelslike_c":"39","visibility_mi":"10.0","visibility_km":"16.1","solarradiation":"--","UV":"3","precip_1hr_string":"0.00 in ( 0 mm)","precip_1hr_in":"0.00","precip_1hr_metric":" 0","precip_today_string":"0.00 in (0 mm)","precip_today_in":"0.00","precip_today_metric":"0","icon":"partlycloudy","nowcast":""}";
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


.forecast
---------
Returns a summary of the weather forecast for the next 10 days. This includes high and low temperatures, a string text forecast and other conditions.

| **Syntax**
| *.forecast(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) It can be address, zipcode or geojson.*
| *full(boolean) Set to get the response with full description. Default is false. (optional)*
| *language(string) Set the language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const weather = new Services(context.token).weather;

        const query = '1017 Main Campus Dr, Raleigh, NC 27606, USA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        const full     = false;
        const language = "EN"

        weather.forecast(query, full, language).then(console.log).catch(console.log);
        //Print array of 'current weather' for every day in the next 10 days;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


.history
--------
Returns a summary of the weather conditions for the last 10 days. This includes high and low temperatures, a string text and other conditions.

| **Syntax**
| *.history(/date/, /query/, /full/, /language/)*
|
| **Arguments**
| *date(string) a past date.*
| *query(string) It can be address, zipcode or geojson.*
| *full(boolean) Set to get response with full description. Default is false. (optional)*
| *language(string) Set the language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const weather = new Services(context.token).weather;

        const date  = '2016-07-07';

        const query = '1017 Main Campus Dr, Raleigh, NC 27606, USA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        const full     = false;
        const language = "EN"

        weather.history(date, query, full, language).then(console.log).catch(console.log);
        //Print array of 'current weather' for every day until reachs a specified date in the past;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

.alert
--------
Returns the short name description, expiration time and a long text description of a severe alert, if one has been issued for the searched location.

| **Syntax**
| *.alert(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) It can be address, zipcode or geojson.*
| *full(boolean) Set to get response with full description. Default is false. (optional)*
| *language(string) Set a language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const weather = new Services(context.token).weather;

        const query = '1017 Main Campus Dr, Raleigh, NC 27606, USA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        const full     = false;
        const language = "EN"

        weather.alert(query, full, language).then(console.log).catch(console.log);
        //Print array of the several alerts in the last days;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
