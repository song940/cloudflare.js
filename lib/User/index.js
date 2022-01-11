const Tokens = require('./tokens');

class Users {
  constructor(cf) {
    this.cf = cf;
    this.tokens = new Tokens(cf);
  }
  get() {
    return this.cf.get('/user');
  }
  edit() {

  }
}

module.exports = Users;