'use strict';
const Extra = require('../extra');

(function init() {

    const api_key = 'xxxxxxxxx'; // API KEY wunderground website
    const weather = new Extra('weather', api_key);

    const query = '1017 Main Campus Dr, Raleigh, NC 27606, USA'; //address

    const full = false;

    weather.forecast(query, full).then(console.log).catch(console.log);
    
})();