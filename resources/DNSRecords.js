const Resource = require('../resource');

class DNSRecords extends Resource {
  list(zone_identifier) {
    return this.cf.get(`/zones/${zone_identifier}/dns_records`);
  }
  create() {

  }
}

module.exports = DNSRecords;