'use strict';
const Analysis = require('tago/analysis');

function myanalysis(data, environment) {
    console.log(data, environment);
}

module.exports = new Analysis(myanalysis, '1345-2332-5674-2354');

/**
 * That analysis can run on your machine, 
 * or on Tago servers, 
 * if will run in Tago server, 
 * we will ignore analysis token.
 */