const DNSRecords = require('./DNSRecords');

class Zones {
  constructor(cf) {
    this.cf = cf;
    this.dns_records = new DNSRecords(cf);
  }
  list() {
    return this.cf.get('/zones');
  }
  get(id) {
    return this.cf.get(`/zones/${id}`);
  }
  activation_check() {

  }
  purge_cache() {

  }
}

module.exports = Zones;