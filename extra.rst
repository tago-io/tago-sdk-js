*****
Extra
*****
Tago support 3party API's to make your life easily, like Google Maps and Weather service. All 3party services below is free to use with a free token that you can get in the owner's website.

geocoding
*********
Whenever you need to get a geolocation (lat/lon) based on a valid address, or vice versa. Use geocoding function. 
Google Geocoding API docs: https://developers.google.com/maps/documentation/geocoding/

.getGeolocation
===============
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when an analysis is called
    function myanalysis(context, scope) {
        const api_key = 'AIzbSyCLOZEH4go819yAyszUqddIiKZs2-GpJaE'; // API that you can get in the google website
        const geocoding = new Extra('geocoding', api_key);

        const address = '1017 Main Campus Dr, Raleigh, NC 27606, USA';

        geocoding.getGeolocation(address).then(console.log).catch(console.log);
        //Print [-78.6772532,35.7704823];
    }

    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

.getAddress
===========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when an analysis is called
    function myanalysis(context, scope) {
        const api_key = 'AIzbSyCLOZEH4go819yAyszUqddIiKZs2-GpJaE'; // API that you can get in the google website
        const geocoding = new Extra('geocoding', api_key);

        const geolocation = '35.7704823,-78.6772532';

        geocoding.getAddress(geolocation).then(console.log).catch(console.log);
        //Print '1017 Main Campus Dr, Raleigh, NC 27606, USA';
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');
    
currency
********
Check several currencies in real-time, and the historical exchange rates for more than 168 countries.
Currency API: https://currencylayer.com/

.convert
========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const api_key = '0aa94a3590d5068eb6830d1bf2222d21-GpJaE'; // API that you can get in the currencylayer website
        const currency = new Extra('currency', api_key);

        const from = 'USD';
        const to   = 'BRL';

        currency.convert(from, to).then(console.log).catch(console.log);
        //Print Example: 3.29883848
    }
    
    module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

distance
********
Whenever you need to calculate the distance between two points use distance service.
Google Distance API docs: https://developers.google.com/maps/documentation/distance-matrix/intro

.measure
========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when analysis are called
    function myanalysis(context, scope) {
        const api_key = 'AIzbSyCLOZEH4go819yAyszUqddIiKZs2-GpJaE'; // API that you can get in the google website
        const distance = new Extra('distance', api_key);

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
*******
Whenever you need to get weather conditions around the world, use weather service.
Wunderground API: https://www.wunderground.com/weather/api/

.current
========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const api_key = 'c5e1c5e9dd23967a'; // API that you can get in the wunderground website
        const weather = new Extra('weather', api_key);

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
=========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const api_key = 'c5e1c5e9dd23967a'; // API that you can get in the wunderground website
        const weather = new Extra('weather', api_key);

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
========
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const api_key = 'c5e1c5e9dd23967a'; // API that you can get in the wunderground website
        const weather = new Extra('weather', api_key);

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
======
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
    const Analysis = require('tago/analysis');
    const Extra = require('tago/extra');

    //Main function to be executed when the analysis is called
    function myanalysis(context, scope) {
        const api_key = 'c5e1c5e9dd23967a'; // API that you can get in the wunderground website
        const weather = new Extra('weather', api_key);

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
