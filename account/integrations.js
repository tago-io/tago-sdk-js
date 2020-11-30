const default_headers  = require('../comum/default_headers');
const Connectors       = require('./integrations.connectors.js');
const Networks         = require('./integrations.networks.js');

class Integrations {
  constructor(acc_token) {
    this.token = acc_token;
    this.default_options = {
      json: true,
      headers: default_headers(this),
    };
  }

  // ----------- Sub-methods -----------
  get connectors() {
    return new Connectors(this.token);
  }
  get networks() {
    return new Networks(this.token);
  }
}

module.exports = Integrations;
