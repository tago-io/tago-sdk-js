
const Email        = require('./email.js');
const SMS          = require('./sms.js');
const Console      = require('./console.js');
const MQTT         = require('./mqtt.js');
const Attachment   = require('./attachment.js');
const Notification = require('./notification.js');

class Services {
  constructor(token) {
    this.token = token;
  }

  get sms() {
    return new SMS(this.token);
  }

  get console() {
    return new Console(this.token);
  }

  get email() {
    return new Email(this.token);
  }

  get MQTT() {
    return new MQTT(this.token);
  }

  get Notification() {
    return new Notification(this.token);
  }

  get Attachment() {
    return new Attachment(this.token);
  }
}

module.exports = Services;
