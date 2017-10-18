'use strict';
const Analysis = require('../analysis');

function myanalysis(context, scope) {
  context.log('my context:', context);
  context.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, '606109f0-bda3-11e6-a1e0-f13b10826644');

/**
 * That analysis can run on your machine, 
 * or on Tago servers, 
 * if will run in Tago server, 
 * we will ignore analysis token.
 */