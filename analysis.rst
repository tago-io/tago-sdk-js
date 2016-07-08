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

    +----------------+--------------------------------------+
    | PROPERTY       |  VALUE                               |
    +================+======================================+
    | environment    | All environment variables            |
    +----------------+--------------------------------------+
    | token          | Token of the analysis                |
    +----------------+--------------------------------------+
    | .log(/msg/)    | Print something to the admin console |
    +----------------+--------------------------------------+

scope
*****
Every time an action triggers a script, the variable **scope** will be generated. This scope will bring all others variables generated at the same time by the same event. For example, if you submit a `form <http://docs.tago.io/en/latest/dashboard.html#widget-form>`, together with the variable that the script is reading, the scope will return a list of all values/variable input in that form. This allows you to manipulate in real time, and more easily, any new value inserted in your bucket.

Build
*****
//TODO: Felipe should document here

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

        sms.send(to, message).then(console.log).catch(console.log);
        //Print "Sending";

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

        email.send(to, subject, message, from).then(console.log).catch(console.log);
        //Print "Sending";

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

        geocoding.get_geolocation(address).then(console.log).catch(console.log);
        //Print [-78.6772532,35.7704823];
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

        let geolocation = '35.7704823,-78.6772532';

        geocoding.get_address(geolocation).then(console.log).catch(console.log);
        //Print '1017 Main Campus Dr, Raleigh, NC 27606, EUA';
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
    
currency
========
Check currency real-time and historical exchange rates for 168 world currencies.

.convert
--------
Return a current value of the coin in to another one.

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

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let currency = Services(context.token).currency;

        let from = 'USD';
        let to   = 'BRL';

        currency.convert(from, to).then(console.log).catch(console.log);
        //Print Example: 3.29883848
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

distance
========
Whenever you need to calculate distance between points. Use distance service.

.measure
--------
Measure is a service that provides travel distance and time for a matrix of origins and destinations.

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
        let distance = Services(context.token).distance;

        let origins      = [ "New York, NY, USA" ];
        let destinations = [ "Washington, DC, USA" ];
        let language     = 'EN';
        let mode         = 'driving';

        distance.measure(origins, destinations, language, mode).then(console.log).catch(console.log);
        //Print
        //TODO; PUT PRINT HERE;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

weather
=======
Whenever you need to get weather conditions. Use weather service.

.current
--------
Get the current weather conditions.

| **Syntax**
| *.current(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) Could be an address name, a zipcode or a geojson.*
| *full(boolean) Set to come with full description. Default is false. (optional)*
| *language(string) Set a language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let weather = Services(context.token).weather;

        let query = '1017 Main Campus Dr, Raleigh, NC 27606, EUA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        let full     = false;
        let language = "EN"

        weather.current(query, full, language).then(console.log).catch(console.log);
        //Print {"station_id":"KNCRALEI48","observation_time":"Last Updated on July 8, 5:40 PM EDT","observation_time_rfc822":"Fri, 08 Jul 2016 17:40:04 -0400","observation_epoch":"1468014004","local_time_rfc822":"Fri, 08 Jul 2016 17:42:43 -0400","local_epoch":"1468014163","local_tz_short":"EDT","local_tz_long":"America/New_York","local_tz_offset":"-0400","weather":"Partly Cloudy","temperature_string":"88.9 F (31.6 C)","temp_f":88.9,"temp_c":31.6,"relative_humidity":"68%","wind_string":"Calm","wind_dir":"North","wind_degrees":-9999,"wind_mph":0,"wind_gust_mph":0,"wind_kph":0,"wind_gust_kph":0,"pressure_mb":"1011","pressure_in":"29.86","pressure_trend":"-","dewpoint_string":"77 F (25 C)","dewpoint_f":77,"dewpoint_c":25,"heat_index_string":"102 F (39 C)","heat_index_f":102,"heat_index_c":39,"windchill_string":"NA","windchill_f":"NA","windchill_c":"NA","feelslike_string":"102 F (39 C)","feelslike_f":"102","feelslike_c":"39","visibility_mi":"10.0","visibility_km":"16.1","solarradiation":"--","UV":"3","precip_1hr_string":"0.00 in ( 0 mm)","precip_1hr_in":"0.00","precip_1hr_metric":" 0","precip_today_string":"0.00 in (0 mm)","precip_today_in":"0.00","precip_today_metric":"0","icon":"partlycloudy","nowcast":""}";
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


.forecast
---------
Returns a summary of the weather for the next 10 days. This includes high and low temperatures, a string text forecast and the conditions.

| **Syntax**
| *.forecast(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) Could be an address name, a zipcode or a geojson.*
| *full(boolean) Set to come with full description. Default is false. (optional)*
| *language(string) Set a language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let weather = Services(context.token).weather;

        let query = '1017 Main Campus Dr, Raleigh, NC 27606, EUA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        let full     = false;
        let language = "EN"

        weather.forecast(query, full, language).then(console.log).catch(console.log);
        //Print array of 'current weather' for every day in the next 10 days;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');


.history
--------
Returns a summary of the weather for the next 10 days. This includes high and low temperatures, a string text forecast and the conditions.

| **Syntax**
| *.history(/date/, /query/, /full/, /language/)*
|
| **Arguments**
| *date(string) a past date.*
| *query(string) Could be an address name, a zipcode or a geojson.*
| *full(boolean) Set to come with full description. Default is false. (optional)*
| *language(string) Set a language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let weather = Services(context.token).weather;

        let date  = '2016-07-07';

        let query = '1017 Main Campus Dr, Raleigh, NC 27606, EUA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        let full     = false;
        let language = "EN"

        weather.history(date, query, full, language).then(console.log).catch(console.log);
        //Print array of 'current weather' for every day until reachs a specified date in the past;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

.alert
--------
Returns the short name description, expiration time and a long text description of a severe alert, if one has been issued for the searched upon location.

| **Syntax**
| *.alert(/query/, /full/, /language/)*
|
| **Arguments**
| *query(string) Could be an address name, a zipcode or a geojson.*
| *full(boolean) Set to come with full description. Default is false. (optional)*
| *language(string) Set a language. Default is 'EN'. See `language support <https://www.wunderground.com/weather/api/d/docs?d=language-support>`_ for more information. (optional)*
|
| **Returns**
| *(Promise)*

.. code-block:: javascript

    'use strict';
    const Analysis = require('tago/Analysis');
    const Services = require('tago/Services');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        let weather = Services(context.token).weather;

        let query = '1017 Main Campus Dr, Raleigh, NC 27606, EUA'; //address
        //or
        query = '35.7704823,-78.6772532'; //geolocation
        //or
        query = '27605'; //zipcode

        let full     = false;
        let language = "EN"

        weather.alert(query, full, language).then(console.log).catch(console.log);
        //Print array of the several alerts in the last days;
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');