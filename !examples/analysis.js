'use strict';
const Analysis = require('../analysis');

function myanalysis(context, scope) {
    context.log('my context:', context);
    context.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, '330291f0-5295-11e6-ac61-35b09393a722');

/**
 * That analysis can run on your machine, 
 * or on Tago servers, 
 * if will run in Tago server, 
 * we will ignore analysis token.
 */