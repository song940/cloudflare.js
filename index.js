const HTTP = require('./http');
const User = require('./resources/User');
const Zones = require('./resources/Zones');
const Accounts = require('./resources/Accounts');
const Memberships = require('./resources/Memberships');

class Cloudflare extends HTTP {
  constructor({ email, key, token, api = 'https://api.cloudflare.com/client/v4' }) {
    super();
    this.api = api;
    this.email = email;
    this.key = key;
    this.token = token;
    // APIs
    this.user = new User(this);
    this.zones = new Zones(this);
    this.accounts = new Accounts(this);
    this.memberships = new Memberships(this);
  }
}

module.exports = Cloudflare;