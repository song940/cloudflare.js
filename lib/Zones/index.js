

class Zones {
  constructor(cf) {
    this.cf = cf;
  }
  list() {
    return this.cf.get('/zones');
  }
}

module.exports = Zones;