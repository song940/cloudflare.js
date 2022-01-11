const HTTP = require('./lib/http');
const User = require('./lib/User');
const Zones = require('./lib/Zones');
const Accounts = require('./lib/Accounts');
const Memberships = require('./lib/Memberships');

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