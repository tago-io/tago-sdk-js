'use strict';
const Services = require('../services');

(function init() {

  const analysis_token = 'xxxxxxxxx'; // Analysis token from TAGO
  const email = new Services(analysis_token).email;

  const to = 'test@tago.io';
  const subject = 'Email Service Test';
  const message = 'Scope of my message';
    
  email.send(to, subject, message).then(console.log).catch(console.log);
})();