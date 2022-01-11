const Devices = require('./Devices');

class Accounts {
  constructor(cf) {
    this.cf = cf;
    this.devices = new Devices(cf);
  }
  list() {
    return this.cf.get('/accounts');
  }
}

module.exports = Accounts;