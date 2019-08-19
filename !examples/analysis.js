const Analysis = require('../analysis');

function myanalysis(context, scope) {
  context.log('my context:', context);
  context.log('my scope:', scope);
}

module.exports = new Analysis(myanalysis, '19daa2d3-4cb4-4308-af04-5da2945c1ae0');

/**
 * That analysis can run on your machine,
 * or on Tago servers,
 * if will run in Tago server,
 * we will ignore analysis token.
 */
