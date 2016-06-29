'use strict';
const Analysis = require('../analysis');

function myanalysis(context, scope) {
    console.log('my context:', context);
    console.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, 'c89f0d50-38e2-11e6-966e-b94d760acc7d');

/**
 * That analysis can run on your machine, 
 * or on Tago servers, 
 * if will run in Tago server, 
 * we will ignore analysis token.
 */