'use strict';
const Extra = require('../extra');

function getWeather(address) {
  const weather = new Extra('weather', 'wunderground_api_key');
  weather.current(address).then(console.log, console.log);
}

getWeather('Paranavaí');

/**
 * That analysis can run on your machine, 
 * or on Tago servers, 
 * if will run in Tago server, 
 * we will ignore analysis token.
 */